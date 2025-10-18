import useAuth from "../../../hooks/use-auth";
import { removeAccessToken, setSession } from "../../../utils/local-storage";
import { useRouter } from "../../../hooks/use-router";
import { useTriggerLogin } from "../../../hooks/user/use-trigger-login";
import { toast } from "react-toastify";
import { PATHS } from "../../../configs/path.config";
import CustomInput from "../custom-input";

import { useForm, type SubmitHandler } from "react-hook-form";
import { loginSchema, type TLoginFormData } from "./login-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "../../atoms/custom-button";
import axiosInstance from "../../../utils/instance";

const LoginForm = () => {
  const router = useRouter();
  const { setUser } = useAuth();
  const { trigger: triggerLogin } = useTriggerLogin({ shouldFetch: true });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginFormData>({
    defaultValues: { username: "john_doe", password: "SecurePass123!" },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<TLoginFormData> = async (data) => {
    delete axiosInstance.defaults.headers.Authorization;
    const res = await triggerLogin({
      username: data.username,
      password: data.password,
    });
    if (res.status === "success") {
      const token = res.data.token;
      axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
      setSession(token);
      setUser?.(res.data.user);
      toast.success("Login successful");
      router.push(PATHS.HOME);
    } else {
      removeAccessToken();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col space-y-6">
        <CustomInput
          label="Account"
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
        <div className="flex justify-center">
          <CustomButton type="submit" isLoading={isSubmitting}>
            Login
          </CustomButton>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
