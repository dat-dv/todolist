import CustomHelmet from "../../molecules/custom-helmet";
import LoginView from "../../organisms/login-view";

export default function LoginPage() {
  return (
    <>
      <CustomHelmet page="LOGIN" />
      <LoginView />
    </>
  );
}
