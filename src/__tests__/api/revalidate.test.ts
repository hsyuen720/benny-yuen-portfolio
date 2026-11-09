import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

import { AppCollection } from "~/settings/constants";

import { GET, POST } from "../../app/api/revalidate/route";

jest.mock("next/cache", () => ({ revalidateTag: jest.fn() }));
// jsdom has no Fetch API Response, so NextResponse.json is reduced to its status
jest.mock("next/server", () => ({
  NextResponse: { json: (_body: unknown, init?: { status?: number }) => init ?? { status: 200 } },
}));

const SECRET = "test-secret";
// The route only reads headers and the query string
const request = (query = "", headers: Record<string, string> = {}) =>
  ({
    headers: new Headers(headers),
    nextUrl: new URL(`http://localhost/api/revalidate${query}`),
  }) as unknown as NextRequest;

describe("/api/revalidate", () => {
  beforeEach(() => {
    process.env.REVALIDATE_SECRET = SECRET;
    jest.mocked(revalidateTag).mockClear();
  });

  it("rejects a bad secret with 401", async () => {
    const res = await POST(request("?tag=projects", { "x-revalidate-secret": "wrong" }));
    expect(res.status).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("rejects a missing secret with 401", async () => {
    const res = await POST(request());
    expect(res.status).toBe(401);
  });

  it("rejects everything when the server has no secret configured", async () => {
    delete process.env.REVALIDATE_SECRET;
    const res = await POST(request("", { "x-revalidate-secret": "" }));
    expect(res.status).toBe(401);
  });

  it("revalidates one tag", async () => {
    const res = await POST(request("?tag=projects", { "x-revalidate-secret": SECRET }));
    expect(res.status).toBe(200);
    expect(revalidateTag).toHaveBeenCalledTimes(1);
    expect(revalidateTag).toHaveBeenCalledWith("projects");
  });

  it("revalidates every collection tag when no tag is given", async () => {
    const res = await POST(request("", { "x-revalidate-secret": SECRET }));
    expect(res.status).toBe(200);
    const all = Object.values(AppCollection);
    expect(revalidateTag).toHaveBeenCalledTimes(all.length);
    all.forEach((tag) => expect(revalidateTag).toHaveBeenCalledWith(tag));
  });

  it("rejects an unknown tag with 400", async () => {
    const res = await POST(request("?tag=users", { "x-revalidate-secret": SECRET }));
    expect(res.status).toBe(400);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("still accepts the deprecated query-param secret on GET", async () => {
    const res = await GET(request(`?secret=${SECRET}&tag=experiences`));
    expect(res.status).toBe(200);
    expect(revalidateTag).toHaveBeenCalledWith("experiences");
  });
});
