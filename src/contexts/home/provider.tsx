"use client";

import { useCallback, useMemo, useState } from "react";

import { PortfolioSection } from "~/settings/constants";
import type { WrapperProps } from "~/types/common";

import { type HomeContextValue, HomeContext } from "./context";

const HomeProvider = (props: WrapperProps) => {
  const { children } = props;
  const [currentView, setCurrentView] = useState<HomeContextValue["currentView"]>(
    PortfolioSection.HeroBanner,
  );

  const focus = useCallback<HomeContextValue["focus"]>((view) => setCurrentView(view), []);

  const scroll = useCallback<HomeContextValue["scroll"]>((id) => {
    const el = document.getElementById(id);
    const navbar = document.getElementById("navbar");
    if (el && navbar) {
      window.scrollTo({ behavior: "smooth", top: el.offsetTop - navbar.offsetHeight });
    }
  }, []);

  const value = useMemo<HomeContextValue>(
    () => ({ currentView, focus, scroll }),
    [currentView, focus, scroll],
  );

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};
export default HomeProvider;
