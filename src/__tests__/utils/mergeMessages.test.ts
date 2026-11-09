import mergeMessages from "~/utils/mergeMessages";

describe("mergeMessages", () => {
  it("keeps local keys the remote file lacks and lets remote values win", () => {
    const local = { a: { b: "local", c: "only-local" }, d: "local" };
    const remote = { a: { b: "remote" }, e: "only-remote" };
    expect(mergeMessages(local, remote)).toEqual({
      a: { b: "remote", c: "only-local" },
      d: "local",
      e: "only-remote",
    });
  });

  it("replaces arrays whole instead of merging them by index", () => {
    const local = { stats: [{ v: "7+" }, { v: "4" }] };
    const remote = { stats: [{ v: "8+" }] };
    const merged = mergeMessages(local, remote);
    expect(Array.isArray(merged.stats)).toBe(true);
    expect(merged.stats).toEqual([{ v: "8+" }]);
  });
});
