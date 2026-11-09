import { Languages } from "~/settings/i18n";
import type { IDate, IExperience, IProject, IStackRow, IText } from "~/types/data";

// Maps Firestore documents (new schema or the older one) to what the page renders,
// so content still shows while the owner migrates fields.

export const toText = (value?: IText | null): string =>
  typeof value === "string" ? value : (value?.[Languages.English] ?? "");

export const toDate = (value?: IDate | null): Date | null => {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value === "object") {
    if ("toDate" in value && typeof value.toDate === "function") return value.toDate();
    if ("seconds" in value) return new Date((value as { seconds: number }).seconds * 1000);
  }
  const date = new Date(value as string | number);
  return Number.isNaN(date.getTime()) ? null : date;
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  stack: Array<string | IStackRow>;
  code?: string;
  demo?: string;
  image?: string;
  featured: boolean;
  order: number;
  status: string;
  date: number;
};

export const toProject = (doc: IProject): Project => {
  const code = doc.links?.code ?? doc.repository;
  return {
    id: doc.id,
    title: toText(doc.title ?? doc.name),
    summary: toText(doc.summary ?? doc.description),
    stack: doc.stack ?? doc.technologies ?? [],
    code,
    demo: doc.links?.demo ?? doc.url,
    image: doc.image ?? doc.photo,
    featured: doc.featured === true,
    order: doc.order ?? Number.MAX_SAFE_INTEGER,
    status: doc.status ?? "live",
    date: toDate(doc.date)?.getTime() ?? 0,
  };
};

/** By `order`, then newest first for documents without one. */
export const sortProjects = (projects: Project[]) =>
  [...projects].sort((a, b) => a.order - b.order || b.date - a.date);

export type Experience = {
  id: string;
  role: string;
  company: string;
  companyShort: string;
  location?: string;
  workMode?: string;
  start: Date | null;
  end: Date | null;
  summary: string;
};

export const toExperience = (doc: IExperience): Experience => ({
  id: doc.id,
  role: toText(doc.role ?? doc.positions?.[0]),
  company: toText(doc.company),
  companyShort: doc.companyShort || toText(doc.company),
  location: doc.location,
  workMode: doc.workMode,
  start: toDate(doc.start ?? doc.fromDate),
  end: toDate(doc.end !== undefined ? doc.end : doc.toDate),
  summary: toText(doc.summary ?? doc.descriptions?.[0]),
});

/** Newest first. */
export const sortExperiences = (experiences: Experience[]) =>
  [...experiences].sort((a, b) => (b.start?.getTime() ?? 0) - (a.start?.getTime() ?? 0));

/** Whole years since the first job started, and how many companies (a promotion is one team). */
export const careerStats = (experiences: Experience[], now: Date) => {
  const starts = experiences.flatMap((e) => (e.start ? [e.start.getTime()] : []));
  if (starts.length === 0) return { years: 0, teams: 0 };
  const first = new Date(Math.min(...starts));
  const months = (now.getFullYear() - first.getFullYear()) * 12 + now.getMonth() - first.getMonth();
  return {
    years: Math.max(0, Math.floor(months / 12)),
    teams: new Set(experiences.map((e) => e.company)).size,
  };
};

/** The newest job that has not ended, if any. */
export const currentExperience = (experiences: Experience[]) =>
  sortExperiences(experiences).find((e) => !e.end);

/**
 * Still studying: no end year (empty, "Present", "in progress"), or an end year still ahead
 * ("2027 (expected)").
 */
export const isStudying = (end: string | undefined, thisYear: number) => {
  const year = end?.match(/\d{4}/)?.[0];
  return !year || Number(year) > thisYear;
};

// Dates are entered in the Firebase console at local midnight in Copenhagen; read them there,
// not in the server's time zone (UTC on Vercel), or 1 Aug shows as Jul.
const SITE_TIME_ZONE = "Europe/Copenhagen";

export const formatMonthYear = (date: Date, locale: string) =>
  new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
    timeZone: SITE_TIME_ZONE,
  }).format(date);

export const yearOf = (date: Date) =>
  Number(new Intl.DateTimeFormat("en", { year: "numeric", timeZone: SITE_TIME_ZONE }).format(date));

/** Ascending by `order`; documents without one go last. */
export const byOrder = <T extends { order?: number }>(a: T, b: T) =>
  (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER);
