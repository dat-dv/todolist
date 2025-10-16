import type { TUser } from "../../types/entities/User.entity";

export type AuthContextType = {
  user?: Partial<TUser>;
  isLoggedIn: boolean;
  isLoading: boolean;
};
