import { useMemo, useState } from "react";
import TodoInput from "./todo-input";
import type { TTask } from "../../../types/entities/task.entity";
import { toast } from "react-toastify";
import TodoItem from "./todo-item";
import { useGetTasks } from "../../../hooks/task/use-get-tasks";
import { useDeleteTask } from "../../../hooks/task/use-delete-task";
import { useUpdateTask } from "../../../hooks/task/use-toggle-task";
import { useCreateTask } from "../../../hooks/task/use-create-task";

const TodoList = () => {
  const [idTaskEdited, setTaskIdEdited] = useState<number | undefined>(
    undefined
  );

  const { trigger: trigerCreatTask } = useCreateTask({
    shouldFetch: true,
  });

  const { trigger: triggerDeleteTask } = useDeleteTask({
    shouldFetch: true,
  });
  const { trigger: triggerUpdateTask } = useUpdateTask({
    shouldFetch: true,
  });

  const { data: tasskRes, mutate: revalidateTasks } = useGetTasks({
    shouldFetch: true,
  });

  const { value: todos = [], ...pagination } = tasskRes || {};
  const editedTask = useMemo(() => {
    return todos.find((todo) => todo.id === idTaskEdited);
  }, [todos, idTaskEdited]);

  const handleAddTodo = (task: Partial<TTask>) => {
    const isEdit = !!task?.id;
    if (isEdit) {
      triggerUpdateTask(task);
      toast.success("Todo updated successfully");
    } else {
      trigerCreatTask(task);
      toast.success("Todo added successfully");
    }
  };

  const handleRemoveTodo = async (id: number) => {
    const res = await triggerDeleteTask({ extendUrl: `/${id}` });
    if (res.status !== "success") {
      toast.error("Failed to remove todo");
      return;
    }
    revalidateTasks();
    toast.success("Todo removed successfully");
  };

  const handleToggleTodo = async (id: number, isCompleted: boolean) => {
    const res = await triggerUpdateTask({
      id: id,
      isCompleted: isCompleted,
      extendUrl: `/${id}`,
    });
    if (res.status !== "success") {
      toast.error("Failed to toggle todo");
      return;
    }
    toast.success("Todo toggled successfully");
    revalidateTasks();
  };

  const handleClickEdit = (id?: number) => {
    setTaskIdEdited(id);
  };

  return (
    <div>
      <div className="max-w-fit mx-auto">
        <TodoInput
          onAdd={handleAddTodo}
          task={editedTask}
          isEdited={!!idTaskEdited}
        />
      </div>
      <div className="max-w-[60%] mx-auto">
        {todos?.map((todo) => (
          <TodoItem
            className="mb-4 "
            key={todo.id}
            onRemove={handleRemoveTodo}
            todo={todo}
            onToggle={handleToggleTodo}
            handleClickEdit={handleClickEdit}
            idTaskEdited={idTaskEdited}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
