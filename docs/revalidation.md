# Auto-revalidation: one-time setup

Flow: a write to a content collection in Firestore → the `revalidate<Collection>` Cloud Function →
`POST {SITE_URL}/api/revalidate?tag=<collection>` with header `x-revalidate-secret` →
`revalidateTag(<collection>)` on Vercel → the next request renders fresh content.

The code is in `functions/src/index.ts`, the route in `src/app/api/revalidate/route.ts`, and CI in
`.github/workflows/functions.yml`. Everything below is manual and done once. No secret value
belongs in this repo; every value is referred to by name only.

## 1. Blaze plan

Firebase console → Usage and billing → Modify plan → Blaze. Cloud Functions need it. Six
triggers firing a few times a month stay well inside the free tier.

## 2. Budget alert ($1)

Google Cloud console → Billing → Budgets & alerts → Create budget:

- Scope: the Firebase project
- Amount: $1 (specified amount)
- Alert thresholds: 50%, 90%, 100% of actual spend, email to billing admins

A budget only alerts; it does not stop spending.

## 3. Enable the Google Cloud APIs

Do this yourself in Google Cloud console → APIs & Services → Enable APIs, so the CI service
account never needs permission to enable APIs:

- Cloud Functions API
- Cloud Build API
- Artifact Registry API
- Cloud Run Admin API
- Eventarc API
- Pub/Sub API
- Secret Manager API

The first deploy of a Firestore trigger can fail while Eventarc's service agent is still being
granted permissions. Wait a few minutes and re-run the workflow.

## 4. Shared secret

Pick one long random value and store it in both places under the same name:

```sh
firebase functions:secrets:set REVALIDATE_SECRET --project <your-project-id>
```

Vercel → Project → Settings → Environment Variables → `REVALIDATE_SECRET` (Production), then
redeploy so the route sees it. For `scripts/revalidate.sh`, keep it in `.env.local` (not
committed).

## 5. Workload Identity Federation for GitHub Actions

Replace the `<...>` placeholders. Run once with an account that owns the project.

```sh
PROJECT_ID=<your-project-id>
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
REPO=hsyuen720/benny-yuen-portfolio

# Service account that CI deploys as
gcloud iam service-accounts create github-functions-deploy --project $PROJECT_ID
SA=github-functions-deploy@$PROJECT_ID.iam.gserviceaccount.com

for role in roles/cloudfunctions.admin roles/run.admin roles/artifactregistry.admin \
            roles/secretmanager.viewer roles/firebase.viewer roles/iam.serviceAccountUser; do
  gcloud projects add-iam-policy-binding $PROJECT_ID --member "serviceAccount:$SA" --role $role
done

# Likely needed (unverified until the first deploy): while deploying, firebase-tools grants the
# functions' runtime account access to REVALIDATE_SECRET, which needs setIamPolicy on that secret.
# secretmanager.viewer alone is not enough. Grant admin on that one secret only, not project-wide.
# Skip this if the first deploy succeeds; run it if it fails with a permission error on the secret.
gcloud secrets add-iam-policy-binding REVALIDATE_SECRET --project $PROJECT_ID \
  --member "serviceAccount:$SA" --role roles/secretmanager.admin

# Pool and provider that trust GitHub's OIDC tokens from this repo only
gcloud iam workload-identity-pools create github --project $PROJECT_ID --location global
gcloud iam workload-identity-pools providers create-oidc github-repo \
  --project $PROJECT_ID --location global --workload-identity-pool github \
  --issuer-uri https://token.actions.githubusercontent.com \
  --attribute-mapping "google.subject=assertion.sub,attribute.repository=assertion.repository" \
  --attribute-condition "assertion.repository == '$REPO'"

gcloud iam service-accounts add-iam-policy-binding $SA --project $PROJECT_ID \
  --role roles/iam.workloadIdentityUser \
  --member "principalSet://iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/github/attribute.repository/$REPO"

# Value for GCP_WORKLOAD_IDENTITY_PROVIDER
echo projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/github/providers/github-repo
```

If the first deploy reports a missing permission, grant exactly that role to the service account
rather than a broad one such as Owner.

## 6. GitHub repository settings

Settings → Secrets and variables → Actions:

| Kind     | Name                             | Value                                                  |
| -------- | -------------------------------- | ------------------------------------------------------ |
| Secret   | `GCP_WORKLOAD_IDENTITY_PROVIDER` | the `projects/.../providers/github-repo` path above    |
| Secret   | `GCP_SERVICE_ACCOUNT`            | `github-functions-deploy@<project-id>.iam.gserviceaccount.com` |
| Variable | `FIREBASE_PROJECT_ID`            | your project id                                        |
| Variable | `SITE_URL`                       | the public site URL, no trailing slash                 |

The workflow runs on pushes to `main` that touch `functions/**`, and can be started by hand from
the Actions tab.

## 7. Firestore region

The database is in the `eur3` multi-region, so the triggers in `functions/src/index.ts` set
`region: "europe-west1"`. Change it there if the database ever moves.

## Checking it works

- Edit any field in `projects` in the Firebase console.
- Firebase console → Functions → Logs should show `Revalidated` for `revalidateProjects`.
- Reload the site: the change is live without a redeploy.

Manual fallback: `sh scripts/revalidate.sh projects` (one collection) or
`sh scripts/revalidate.sh` (all).

## Deprecation

`/api/revalidate?secret=...` still works for this release. Remove the query-param fallback in
`src/app/api/revalidate/route.ts` in the next one.
