/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";

import type { AuthContextType } from "./auth-provider.types";
import { AuthContext } from "./auth-context";
import { checkShouldFetch } from "../../utils/check-should-fetch";
import { useGetMyProfile } from "../../hooks/user/use-profile-me";
import type { TUser } from "../../types/entities/User.entity";
import axiosInstance from "../../utils/instance";
import { removeAccessToken } from "../../utils/local-storage";
import { PATHS } from "../../configs/path.config";
import { useRouter } from "../../hooks/use-router";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const shouldFetch = checkShouldFetch();
  const router = useRouter();

  const { data: profile, mutate } = useGetMyProfile({
    shouldFetch,
  });

  const setUser = (user: TUser) => {
    mutate({ ...(profile || {}), ...(user || {}) }, false);
  };

  const logOut = () => {
    delete axiosInstance.defaults.headers.Authorization;
    removeAccessToken();
    mutate({} as TUser, false);
    router.push(PATHS.LOGIN);
  };

  const context = useMemo<AuthContextType>(
    () =>
      ({
        user: profile,
        isLoggedIn: !!profile?.username,
        isLoading: shouldFetch,
        setUser,
        logOut,
      } as AuthContextType),
    [logOut, setUser, shouldFetch, profile]
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
