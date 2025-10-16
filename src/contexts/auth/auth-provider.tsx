import React, { useMemo } from "react";

// import { useGetMyProfile } from "src/hooks/swr/vehicle/get/organization-master";
import type { AuthContextType } from "./auth-provider.types";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const useGetMyProfile = ({ shouldFetch }: { shouldFetch: boolean }) => {
    return { data: null, isLoading: true };
  };
  const { data: profileInfos, isLoading = true } = useGetMyProfile({
    shouldFetch: true,
  });

  const contextValue = useMemo<AuthContextType>(
    () => ({
      user: {},
      isLoggedIn: false,
      isLoading: isLoading,
    }),

    [isLoading, profileInfos]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
