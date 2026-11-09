import type { Timestamp } from "firebase/firestore";

import { Languages } from "~/settings/i18n";
import { ValueOf } from "~/types/common";

export type ITranslation = Record<ValueOf<typeof Languages>, string>;

/** Plain text, or the older per-locale object ({ en: "..." }). */
export type IText = string | ITranslation;

/** A Firestore Timestamp, or anything `new Date()` accepts. */
export type IDate = Timestamp | string | number;

export interface IStackRow {
  label: string;
  value: string;
}

export interface IExperience {
  id: string;
  role?: IText;
  company?: IText;
  location?: string;
  workMode?: string;
  start?: IDate;
  end?: IDate | null;
  summary?: IText;
  // Legacy fields, read when the new ones are missing
  positions?: ITranslation[];
  fromDate?: Timestamp;
  toDate?: Timestamp | null;
  descriptions?: ITranslation[];
  technologies?: string[];
}

export interface IProject {
  id: string;
  title?: IText;
  summary?: IText;
  stack?: Array<string | IStackRow>;
  links?: { code?: string; demo?: string };
  image?: string;
  featured?: boolean;
  order?: number;
  status?: string;
  // Legacy fields, read when the new ones are missing
  date?: Timestamp;
  name?: ITranslation;
  description?: ITranslation;
  technologies?: string[];
  url?: string;
  repository?: string;
  photo?: string;
}

export interface ITool {
  id: string;
  group: "ai" | "stack";
  name: string;
  detail: string;
  order?: number;
}

export interface IEducation {
  id: string;
  degree: string;
  institution: string;
  start?: string;
  end?: string;
  order?: number;
}

export interface IHomeContent {
  id: string;
  intro?: string;
  experienceIntro?: string;
}

export interface ISocialMedia {
  id: "github" | "linkedin" | "email";
  value: string;
  order: number;
}
