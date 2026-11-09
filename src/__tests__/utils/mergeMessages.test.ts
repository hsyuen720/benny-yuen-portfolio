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
});
