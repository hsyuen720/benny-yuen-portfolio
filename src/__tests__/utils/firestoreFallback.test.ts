import getCollection from "~/utils/getCollection";
import getDocument from "~/utils/getDocument";

jest.mock("~/utils/firebase", () => ({ db: {} }));
jest.mock("next/cache", () => ({ unstable_cache: (fn: () => unknown) => fn }));
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  orderBy: jest.fn(),
  query: jest.fn(),
  getDocs: jest.fn(() => Promise.reject(new Error("Missing or insufficient permissions."))),
  getDoc: jest.fn(() => Promise.reject(new Error("Missing or insufficient permissions."))),
}));

describe("Firestore read failures", () => {
  beforeEach(() => jest.spyOn(console, "error").mockImplementation(() => {}));
  afterEach(() => jest.restoreAllMocks());

  it("getCollection resolves to an empty list so the section can use its fallback", async () => {
    await expect(getCollection("tools")).resolves.toEqual([]);
    expect(console.error).toHaveBeenCalled();
  });

  it("getDocument resolves to null so the bundled copy is shown", async () => {
    await expect(getDocument("content", "home")).resolves.toBeNull();
    expect(console.error).toHaveBeenCalled();
  });
});
