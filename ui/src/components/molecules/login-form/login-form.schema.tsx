import z from "zod";
import {
  passwordSchema,
  usernameSchema,
} from "../register-form/register-form.schema";

export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export type TLoginFormData = z.infer<typeof loginSchema>;
