import React from "react";
import type { TSimpleLayoutProps } from "./simple-layout.type";
import UserMenu from "../../molecules/user-menu";

export const SimpleLayout: React.FC<TSimpleLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-100 overflow-x-hidden">
      <div className="fixed top-3 right-3 xs:top-4 xs:right-4 sm:top-10 sm:right-10 z-50">
        <UserMenu />
      </div>

      <div
        className="
        w-full 
        max-w-full
        px-3 xs:px-4 sm:px-6 md:px-8 
        py-4 xs:py-6 sm:py-8 
        pb-40 xs:pb-48 sm:pb-60
        box-border
      "
      >
        <div className="w-full max-w-full overflow-hidden">{children}</div>
      </div>
    </div>
  );
};
