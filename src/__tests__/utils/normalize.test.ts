import type { IExperience, IProject } from "~/types/data";
import { sortExperiences, sortProjects, toExperience, toProject } from "~/utils/normalize";

const ts = (iso: string) => ({ toDate: () => new Date(iso) });

describe("normalize", () => {
  it("maps legacy project fields", () => {
    const p = toProject({
      id: "a",
      name: { en: "Old" },
      description: { en: "Desc" },
      technologies: ["React"],
      repository: "https://github.com/me/repo",
      url: "https://demo",
    } as IProject);
    expect(p).toMatchObject({
      title: "Old",
      summary: "Desc",
      stack: ["React"],
      code: "https://github.com/me/repo",
      demo: "https://demo",
      featured: false,
      status: "live",
    });
    // No image: the card draws a Hairline figure instead of a generated GitHub card
    expect(p.image).toBeUndefined();
  });

  it("prefers new project fields", () => {
    const p = toProject({
      id: "a",
      title: "New",
      name: { en: "Old" },
      links: { code: "c" },
      repository: "r",
    } as IProject);
    expect(p.title).toBe("New");
    expect(p.code).toBe("c");
  });

  it("sorts projects by order, then newest first", () => {
    const sorted = sortProjects(
      [
        { id: "x", date: ts("2020-01-01") },
        { id: "y", order: 2 },
        { id: "z", order: 1 },
        { id: "w", date: ts("2024-01-01") },
      ].map((d) => toProject(d as IProject)),
    );
    expect(sorted.map((p) => p.id)).toEqual(["z", "y", "w", "x"]);
  });

  it("maps legacy experience fields and sorts newest first", () => {
    const old = toExperience({
      id: "old",
      company: { en: "FUJIFILM" },
      positions: [{ en: "Programmer" }],
      fromDate: ts("2019-07-01"),
      toDate: ts("2022-11-01"),
      descriptions: [{ en: "Built a CMS" }],
    } as unknown as IExperience);
    const current = toExperience({ id: "new", role: "Engineer", start: "2026-08-01" });
    expect(old).toMatchObject({ role: "Programmer", company: "FUJIFILM", summary: "Built a CMS" });
    expect(current.end).toBeNull();
    expect(sortExperiences([old, current]).map((e) => e.id)).toEqual(["new", "old"]);
  });
});
