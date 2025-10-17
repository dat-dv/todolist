import MainTitle from "../../atoms/main-title";
import { SimpleLayout } from "../../layouts/simple-layout";

const HomePage = () => {
  return (
    <SimpleLayout>
      <MainTitle title="To-Do List" className="text-center mb-10" />
    </SimpleLayout>
  );
};

export default HomePage;
