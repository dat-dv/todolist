import React, { useEffect } from "react";

// import { useGetMyProfile } from "src/hooks/swr/vehicle/get/organization-master";
import type { AuthContextType } from "./auth-provider.types";
import { AuthContext } from "./auth-context";
import { checkShouldFetch } from "../../utils/check-should-fetch";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const useGetMyProfile = ({ shouldFetch }: { shouldFetch: boolean }) => {
    return { data: null, isLoading: true };
  };
  const { data: profileInfos } = useGetMyProfile({
    shouldFetch: checkShouldFetch(),
  });

  const [context, setContext] = React.useState<AuthContextType>(
    () =>
      ({
        user: {},
        isLoggedIn: false,
        isLoading: true,
      } as AuthContextType)
  );

  useEffect(() => {
    // if (context.isLoading || context.isLoggedIn) return;
    setTimeout(() => {
      setContext((prev) => ({ ...prev, isLoading: false, isLoggedIn: true }));
    }, 3000);
  }, [context.isLoading, context.isLoggedIn, profileInfos]);

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
