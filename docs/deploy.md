# Deploying the site

Production deploys only after CI passes.

1. A push to `main` runs `.github/workflows/ci.yml`: lint, type check, unit tests.
2. If all pass, the `deploy` job POSTs to a Vercel Deploy Hook, which builds and ships `main`.
3. `vercel.json` turns off Vercel's own Git deploys for `main`, so nothing ships without step 2.
   Pull request previews still deploy as before.

## One-time setup

1. Vercel → Project → Settings → Git → Deploy Hooks: create a hook for branch `main`.
2. GitHub → repo → Settings → Secrets and variables → Actions: add the hook URL as the
   secret `VERCEL_DEPLOY_HOOK`. The URL is a credential; never commit it.
3. Optional: GitHub branch protection on `main` requiring the `check` job, so a failing PR cannot merge.

To redeploy by hand, re-run the workflow's `deploy` job, or use the hook from the Vercel dashboard.
