// SimpleLayout.tsx
import React from "react";
import type { TSimpleLayoutProps } from "./simple-layout.type";

export const SimpleLayout: React.FC<TSimpleLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 pb-60">{children}</div>
    </div>
  );
};
