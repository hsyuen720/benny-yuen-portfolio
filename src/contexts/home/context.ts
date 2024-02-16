import { createContext } from "react";

import type { PortfolioSection } from "~/settings/constants";
import type { ValueOf } from "~/types/common";

export interface HomeContextValue<T = ValueOf<typeof PortfolioSection>> {
  currentView: T;
  focus(view: T): void;
  scroll(target: T): void;
}

export const HomeContext = createContext<HomeContextValue>({} as HomeContextValue);
