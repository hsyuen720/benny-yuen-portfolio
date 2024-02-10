import type { ReactNode } from "react";

export type ValueOf<T> = T[keyof T];

export type WrapperProps = {
  children: ReactNode;
};
