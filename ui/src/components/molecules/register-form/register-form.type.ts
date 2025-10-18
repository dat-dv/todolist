import type { ComponentPropsWithoutRef } from "react";

export type TRegisterInputs = {
  username: string;
  password: string;
  confirmPassword: string;
};

export type TRegisterFormProps = ComponentPropsWithoutRef<"form">;
