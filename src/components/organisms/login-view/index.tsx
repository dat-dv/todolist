import MainTitle from "../../atoms/main-title";
import { SimpleLayout } from "../../layouts/simple-layout";
import LoginForm from "../../molecules/login-form";

const LoginView = () => {
  return (
    <SimpleLayout>
      <MainTitle title="Login" className="text-center mb-16" />
      <LoginForm className="max-w-md mx-auto" />
    </SimpleLayout>
  );
};

export default LoginView;
