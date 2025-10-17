import LoginPage from "../components/page/login-page";
import RegisterPage from "../components/page/register-page";
import { PATHS } from "../configs/path.config";

export const authRoutes = [
  { path: PATHS.LOGIN, element: <LoginPage /> },
  { path: PATHS.REGISTER, element: <RegisterPage /> },
];
