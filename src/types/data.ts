export interface ITranslation {
  en: string;
  zh: string;
}

export interface IExperience {
  company: ITranslation;
  positions: ITranslation[];
  fromDate: string;
  toDate: string | null;
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
