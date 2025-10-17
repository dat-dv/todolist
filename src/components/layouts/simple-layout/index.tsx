// SimpleLayout.tsx
import React from "react";
import type { TSimpleLayoutProps } from "./simple-layout.type";
import UserMenu from "../../molecules/user-menu";

export const SimpleLayout: React.FC<TSimpleLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-100">
      <div className="fixed top-5 right-5 z-50">
        <UserMenu />
      </div>
      <div className="p-8 pb-60">{children}</div>
    </div>
  );
};
