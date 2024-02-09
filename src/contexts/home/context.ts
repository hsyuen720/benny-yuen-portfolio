import { createContext } from "react";

import type { PortfolioSections } from "~/settings/constants";
import type { ValueOf } from "~/utils/type";

export interface HomeContextValue<T = ValueOf<typeof PortfolioSections>> {
  currentView: T;
  focus(view: T): void;
  scroll(target: T): void;
}

export const HomeContext = createContext<HomeContextValue>({} as HomeContextValue);
