import { logger } from "firebase-functions";
import { onDocumentWritten } from "firebase-functions/firestore";
import { defineSecret, defineString } from "firebase-functions/params";

import { postWithRetry } from "./post.js";

// Every Firestore write to a content collection asks the site to drop that collection's cache.
// Keep the exports below in sync with AppCollection in src/settings/constants.ts.

const REVALIDATE_SECRET = defineSecret("REVALIDATE_SECRET");
const SITE_URL = defineString("SITE_URL", {
  description: "Public URL of the Next.js site, without a trailing slash",
});

const trigger = (collection: string) =>
  onDocumentWritten(
    // Our own single retry covers flaky requests; event retries could loop for days
    { document: `${collection}/{docId}`, secrets: [REVALIDATE_SECRET], retry: false },
    async () => {
      await postWithRetry(
        `${SITE_URL.value()}/api/revalidate?tag=${encodeURIComponent(collection)}`,
        { "x-revalidate-secret": REVALIDATE_SECRET.value() },
        (level, message, data) => logger[level](message, { collection, ...data }),
      );
    },
  );

export const revalidateExperiences = trigger("experiences");
export const revalidateProjects = trigger("projects");
export const revalidateSocialMedia = trigger("socialMedia");
export const revalidateTools = trigger("tools");
export const revalidateEducation = trigger("education");
export const revalidateContent = trigger("content");
