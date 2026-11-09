import { getSeedCollection, getSeedDocument } from "~/utils/seed";

describe("seed", () => {
  const env = process.env;
  afterEach(() => {
    process.env = env;
  });
  const setEnv = (nodeEnv: "development" | "production", flag?: string) => {
    process.env = { ...env, NODE_ENV: nodeEnv, USE_SEED_DATA: flag };
  };

  it("is off unless both development and USE_SEED_DATA=1", () => {
    setEnv("production", "1");
    expect(getSeedCollection("projects")).toBeUndefined();
    setEnv("development");
    expect(getSeedDocument("content", "home")).toBeUndefined();
  });

  it("serves seed collections and documents in development with the flag", () => {
    setEnv("development", "1");
    expect(getSeedCollection("projects")?.length).toBeGreaterThan(0);
    expect(getSeedDocument("content", "home")).toMatchObject({ id: "home" });
    expect(getSeedDocument("content", "missing")).toBeNull();
  });

  it("leaves socialMedia to Firestore", () => {
    setEnv("development", "1");
    expect(getSeedCollection("socialMedia")).toBeUndefined();
  });

  it("holds only real content: no placeholders or example links", () => {
    setEnv("development", "1");
    const all = ["content", "projects", "experiences", "tools", "education"] as const;
    const text = JSON.stringify(all.map((c) => getSeedCollection(c)));
    expect(text).not.toMatch(/sample|placeholder|example\.com|TODO/i);
  });
});
