import type { Timestamp } from "firebase/firestore";

import { Languages } from "~/settings/i18n";
import { ValueOf } from "~/types/common";

export type ITranslation = Record<ValueOf<typeof Languages>, string>;

export interface IExperience {
  company: ITranslation;
  positions: ITranslation[];
  fromDate: Timestamp;
  toDate: Timestamp | null;
  descriptions: ITranslation[];
  technologies: string[];
}

export interface IProject {
  year: number;
  name: ITranslation;
  description: ITranslation;
  technologies: string[];
  url?: string;
  repository?: string;
  photo?: string;
}

export interface ISocialMedia {
  id: "github" | "linkedin" | "email";
  value: string;
  order: number;
}
