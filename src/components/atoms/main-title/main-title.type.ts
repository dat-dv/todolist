import type { ComponentPropsWithoutRef } from "react";

export type TMainTitleProps = ComponentPropsWithoutRef<"h1"> & {
  title: string;
  size?: `text-[${number}px]`;
};
