import type {
  TRegisterReq,
  TRegisterRes,
} from "../../types/entities/User.entity";
import REQUEST from "../../utils/request";

export const useTriggerResgister = REQUEST.trigger<TRegisterRes, TRegisterReq>(
  "/auth/register",
  "POST"
);
