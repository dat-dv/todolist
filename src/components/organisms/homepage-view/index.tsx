import MainTitle from "../../atoms/main-title";
import { SimpleLayout } from "../../layouts/simple-layout";
import TodoList from "../../molecules/todo-list";

const HomePage = () => {
  return (
    <SimpleLayout>
      <MainTitle title="To-Do List" className="text-center mb-16" />
      <TodoList />
    </SimpleLayout>
  );
};

export default HomePage;
