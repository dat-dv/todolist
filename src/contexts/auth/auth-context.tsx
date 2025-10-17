import { createContext } from "react";

import type { AuthContextType } from "./auth-provider.types";

export const AuthContext = createContext<AuthContextType>({
  user: {},
  isLoggedIn: false,
  isLoading: true,
  setUser: undefined,
});
