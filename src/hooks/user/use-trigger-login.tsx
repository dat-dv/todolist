import type {
  TUserLoginReq,
  TUserLoginRes,
} from "../../types/entities/User.entity";
import REQUEST from "../../utils/request";

export const useTriggerLogin = REQUEST.trigger<TUserLoginRes, TUserLoginReq>(
  "/auth/login",
  "POST"
);
