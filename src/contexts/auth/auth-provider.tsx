import React, { useEffect } from "react";

// import { useGetMyProfile } from "src/hooks/swr/vehicle/get/organization-master";
import type { AuthContextType } from "./auth-provider.types";
import { AuthContext } from "./auth-context";
import { checkShouldFetch } from "../../utils/check-should-fetch";
import { useGetMyProfile } from "../../hooks/user/use-profile-me";
import type { TUser } from "../../types/entities/User.entity";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const shouldFetch = checkShouldFetch();

  const {
    data: profile,
    mutate,
    isLoading: isLoadingProfile,
  } = useGetMyProfile({
    shouldFetch,
  });

  const setUser = (user: TUser) => {
    mutate({ ...(profile || {}), ...(user || {}) }, false);
  };

  const [context, setContext] = React.useState<AuthContextType>(
    () =>
      ({
        user: {},
        isLoggedIn: false,
        isLoading: shouldFetch,
        setUser,
      } as AuthContextType)
  );

  useEffect(() => {
    if (profile && !isLoadingProfile) {
      setContext((prev) => ({
        ...prev,
        user: profile,
        isLoggedIn: !!profile?.username,
        isLoading: false,
      }));
    }
  }, [isLoadingProfile, profile, shouldFetch]);

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
