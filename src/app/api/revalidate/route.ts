import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

import { AppCollection } from "~/settings/constants";

const tags = Object.values(AppCollection);

// Each Firestore collection is cached under its own tag (see getCollection / getDocument).
// ?tag=<collection> refreshes one; no tag refreshes all of them.
const handler = (request: NextRequest) => {
  const secret =
    request.headers.get("x-revalidate-secret") ??
    // Deprecated: query-param secret kept for one release so old callers keep working
    request.nextUrl.searchParams.get("secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const tag = request.nextUrl.searchParams.get("tag");
  if (tag !== null && !tags.includes(tag)) {
    return NextResponse.json({ message: `Unknown tag '${tag}'` }, { status: 400 });
  }

  const revalidated = tag ? [tag] : tags;
  revalidated.forEach((t) => revalidateTag(t));
  return NextResponse.json({ revalidated, now: Date.now() });
};

export const GET = handler;
export const POST = handler;
