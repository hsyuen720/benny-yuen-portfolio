"use client";

import { Exploded, Hub, Keyboard, Riffle } from "@lucasmarkes/hairline/react";
import { useEffect, useState } from "react";

import useInView from "~/hooks/useInView";

const figures = { Exploded, Hub, Keyboard, Riffle };

// Hairline's `play` loops until the pointer arrives, so we switch it off after one tour.
// shortcut: one fixed length for every figure, measure per figure if a tour gets cut short.
const TOUR_MS = 6000;

export type HairlineFigureProps = {
  figure: keyof typeof figures;
  label: string;
  className?: string;
};

const HairlineFigure = (props: HairlineFigureProps) => {
  const { figure, label, className } = props;
  const Figure = figures[figure];
  const { el, isInView } = useInView({ once: true, threshold: 0.3 });
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    setPlay(true);
    const timer = setTimeout(() => setPlay(false), TOUR_MS);
    return () => clearTimeout(timer);
  }, [isInView]);

  return <Figure ref={el} className={className} label={label} theme="dark" play={play} />;
};
export default HairlineFigure;
