import type { TUser } from "../../types/entities/User.entity";
import REQUEST from "../../utils/request";

export const useGetMyProfile = REQUEST.get<TUser>("/auth/me");
