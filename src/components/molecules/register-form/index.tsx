import React from "react";
import useAuth from "../../../hooks/use-auth";
import { setSession } from "../../../utils/local-storage";
import { useRouter } from "../../../hooks/use-router";

import { toast } from "react-toastify";
import { PATHS } from "../../../configs/path.config";
import CustomInput from "../custom-input";

import { useForm, type SubmitHandler } from "react-hook-form";
import { useTriggerResgister } from "../../../hooks/user/use-trigger-register";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./register-form.schema";
import CustomButton from "../../atoms/custom-button";

type TRegisterInputs = {
  username: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const { setUser } = useAuth();
  const { trigger: triggerRegister } = useTriggerResgister({
    shouldFetch: true,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterInputs>({
    defaultValues: { username: "", password: "", confirmPassword: "" },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<TRegisterInputs> = async (data) => {
    // call register trigger
    const res = await triggerRegister({
      username: data.username,
      password: data.password,
    });

    if (res?.status === "success") {
      const token = res.data.token;
      setSession(token);
      setUser?.(res.data.user);
      toast.success("Registration successful");
      router.push(PATHS.HOME);
    } else {
      toast.error(res?.error?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col space-y-6">
        <CustomInput
          label="Username"
          id="username"
          {...register("username")}
          error={errors.username?.message}
        />

        <CustomInput
          label="Password"
          id="password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />

        <CustomInput
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <div className="flex justify-center">
          <CustomButton type="submit" isLoading={isSubmitting}>
            Register
          </CustomButton>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
