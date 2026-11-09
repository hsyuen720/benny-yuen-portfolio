import assert from "node:assert/strict";
import { test } from "node:test";

import { postWithRetry } from "./post.js";

const respond = (...statuses: Array<number | Error>) => {
  const calls: RequestInit[] = [];
  const impl = (async (_url: string, init: RequestInit) => {
    calls.push(init);
    const next = statuses.shift();
    if (next instanceof Error) throw next;
    return new Response(null, { status: next });
  }) as typeof fetch;
  return { impl, calls };
};
const noLog = () => {};

test("succeeds on the first try and sends the secret header", async () => {
  const { impl, calls } = respond(200);
  assert.equal(await postWithRetry("http://x", { "x-revalidate-secret": "s" }, noLog, impl), true);
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0].headers, { "x-revalidate-secret": "s" });
});

test("retries once after a failed status", async () => {
  const { impl, calls } = respond(500, 200);
  assert.equal(await postWithRetry("http://x", {}, noLog, impl), true);
  assert.equal(calls.length, 2);
});

test("retries once after a network error, then gives up", async () => {
  const { impl, calls } = respond(new Error("down"), 503);
  const levels: string[] = [];
  const ok = await postWithRetry("http://x", {}, (level) => levels.push(level), impl);
  assert.equal(ok, false);
  assert.equal(calls.length, 2);
  assert.deepEqual(levels, ["warn", "warn", "error"]);
});
