import { toast } from "react-toastify";
import { PATHS } from "../../../configs/path.config";
import { useRouter } from "../../../hooks/use-router";
import { useTriggerLogin } from "../../../hooks/user/use-trigger-login";
import { setSession } from "../../../utils/local-storage";
import useAuth from "../../../hooks/use-auth";

const LoginView = () => {
  const router = useRouter();
  const { setUser } = useAuth();
  const { trigger: triggerLogin } = useTriggerLogin({ shouldFetch: true });

  const handleSubmit = async () => {
    const res = await triggerLogin({
      username: "john_doe",
      password: "SecurePass123!",
    });
    if (res.status === "success") {
      const token = res.data.token;
      setSession(token);
      setUser?.(res.data.user);
      toast.success("Login successful");
      return router.push(PATHS.HOME);
    }
    toast.error(res?.error?.message || "Login failed");
  };

  return (
    <div>
      LOGIN PAGEE <br />
      <a href="/login">Go to login page</a>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button type="submit" onClick={handleSubmit}>
        Login
      </button>
    </div>
  );
};

export default LoginView;
