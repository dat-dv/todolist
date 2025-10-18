import type { ReactNode } from "react";

export type TErrorBoundaryProps = {
  children: ReactNode;
};

export type TErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};
