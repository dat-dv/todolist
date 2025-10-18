import MainTitle from "../../atoms/main-title";
import { SimpleLayout } from "../../layouts/simple-layout";
import RegisterForm from "../../molecules/register-form";

const RegisterView = () => {
  return (
    <SimpleLayout>
      <MainTitle title="Register" className="text-center mb-16" />
      <RegisterForm className="max-w-md mx-auto" />
    </SimpleLayout>
  );
};

export default RegisterView;
