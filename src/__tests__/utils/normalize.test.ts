import type { IExperience, IProject } from "~/types/data";
import {
  careerStats,
  currentExperience,
  formatMonthYear,
  isStudying,
  roleLine,
  toDate,
  yearOf,
  sortExperiences,
  sortProjects,
  toExperience,
  toProject,
} from "~/utils/normalize";

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

  describe("roleLine", () => {
    it("joins role and location", () => {
      expect(roleLine({ role: "Software Engineer", location: "Copenhagen" })).toBe(
        "Software Engineer, Copenhagen",
      );
    });

    it("drops a missing part, and is empty when both are missing", () => {
      expect(roleLine({ role: "Software Engineer" })).toBe("Software Engineer");
      expect(roleLine({ role: "", location: undefined })).toBe("");
    });
  });

  describe("currentExperience", () => {
    const job = (id: string, start: string, end: string | null) =>
      toExperience({ id, company: id, start: ts(start), end: end ? ts(end) : null } as IExperience);

    it("returns the newest job without an end date", () => {
      const jobs = [job("old", "2019-01-01", "2022-01-01"), job("now", "2026-08-01", null)];
      expect(currentExperience(jobs)?.id).toBe("now");
    });

    it("prefers the newest of two open jobs", () => {
      const jobs = [job("side", "2020-01-01", null), job("main", "2026-08-01", null)];
      expect(currentExperience(jobs)?.id).toBe("main");
    });

    it("returns undefined when every job has ended", () => {
      expect(currentExperience([job("old", "2019-01-01", "2022-01-01")])).toBeUndefined();
      expect(currentExperience([])).toBeUndefined();
    });
  });

  describe("isStudying", () => {
    it.each([
      [undefined, true],
      ["", true],
      ["2027 (expected)", true],
      ["2027", true],
      ["2026", false],
      ["2019", false],
      ["Present", true],
      ["in progress", true],
    ])("end %p in 2026 -> %p", (end, expected) => {
      expect(isStudying(end, 2026)).toBe(expected);
    });
  });

  describe("companyShort", () => {
    it("uses the short name when given and falls back to the full name", () => {
      const withShort = toExperience({
        id: "m",
        company: "Melco Resorts & Entertainment",
        companyShort: "Melco",
      } as IExperience);
      const without = toExperience({ id: "a", company: "Amplify Health" } as IExperience);
      expect(withShort.companyShort).toBe("Melco");
      expect(without.companyShort).toBe("Amplify Health");
    });
  });

  describe("toDate", () => {
    it("reads a Timestamp serialized by the cache as {seconds, nanoseconds}", () => {
      expect(toDate({ seconds: 1785542400, nanoseconds: 0 } as never)?.toISOString()).toBe(
        "2026-08-01T00:00:00.000Z",
      );
    });

    it("treats a legacy null end as no date", () => {
      const job = toExperience({
        id: "x",
        company: "C",
        fromDate: ts("2019-07-08"),
        toDate: null,
      } as IExperience);
      expect(job.end).toBeNull();
    });
  });

  describe("site time zone", () => {
    // 1 Aug 2026 00:00 in Copenhagen is 31 Jul 22:00 UTC, which is what the console stores
    const augFirstCph = new Date("2026-07-31T22:00:00Z");
    const newYearCph = new Date("2025-12-31T23:30:00Z");

    it("formats month and year in Copenhagen time, not the server's", () => {
      expect(formatMonthYear(augFirstCph, "en")).toBe("Aug 2026");
    });

    it("reads the year in Copenhagen time", () => {
      expect(yearOf(newYearCph)).toBe(2026);
    });
  });

  describe("careerStats", () => {
    const job = (company: string, start: string, end: string | null) =>
      toExperience({
        id: company,
        company,
        start: ts(start),
        end: end ? ts(end) : null,
      } as IExperience);
    const now = new Date("2026-11-09T12:00:00Z");

    it("counts whole years since the first job and each company once", () => {
      const jobs = [
        job("FBHK", "2019-07-08", "2020-08-31"),
        job("FBHK", "2020-09-01", "2022-11-10"),
        job("Amplify", "2022-11-11", "2024-03-01"),
        job("Melco", "2024-03-04", "2026-07-31"),
        job("Jurnie", "2026-08-01", null),
      ];
      expect(careerStats(jobs, now)).toEqual({ years: 7, teams: 4 });
    });

    it("is zero with no dated experience", () => {
      expect(careerStats([], now)).toEqual({ years: 0, teams: 0 });
    });
  });
});
