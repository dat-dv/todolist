import { useMemo, useState } from "react";
import TodoInput from "./todo-input";
import type { TTask } from "../../../types/entities/task.entity";
import { toast } from "react-toastify";
import TodoItem from "./todo-item";
import { useGetTasks } from "../../../hooks/task/use-get-tasks";
import { useDeleteTask } from "../../../hooks/task/use-delete-task";
import { useUpdateTask } from "../../../hooks/task/use-toggle-task";
import { useCreateTask } from "../../../hooks/task/use-create-task";
import Pagination from "../pagination";

const TodoList = () => {
  const [idTaskEdited, setTaskIdEdited] = useState<number | undefined>(
    undefined
  );
  const [currentPage, setCurrentPage] = useState(1);

  const { trigger: trigerCreatTask, isMutating: isCreating } = useCreateTask({
    shouldFetch: true,
  });

  const { trigger: triggerDeleteTask } = useDeleteTask({
    shouldFetch: true,
  });
  const { trigger: triggerUpdateTask, isMutating: isUpdating } = useUpdateTask({
    shouldFetch: true,
  });

  const isSubmitting = isUpdating || isCreating;

  const { data: tasskRes, mutate: revalidateTasks } = useGetTasks({
    shouldFetch: true,
    params: {
      page: currentPage,
      limit: 10,
    },
  });

  const {
    value: todos = [],
    totalPages = 1,
    hasNextPage,
    hasPreviousPage,
  } = tasskRes || {};

  const editedTask = useMemo(() => {
    return todos.find((todo) => todo.id === idTaskEdited);
  }, [todos, idTaskEdited]);

  const handleAddTodo = async (task: Partial<TTask>) => {
    const res = await trigerCreatTask(task);
    const isSuccess = res.status === "success";
    if (!isSuccess) {
      toast.error("Failed to create todo");
      return;
    }
    toast.success("Todo created successfully");
    revalidateTasks();
  };

  const handleEditTask = async (task: Partial<TTask>) => {
    const res = await triggerUpdateTask({
      ...task,
      extendUrl: `/${task.id}`,
    });
    const isSuccess = res.status === "success";
    if (!isSuccess) {
      toast.error("Failed to update todo");
      return;
    }
    toast.success("Todo updated successfully");
    revalidateTasks();
  };

  const handleSubmitTodo = async (task: Partial<TTask>) => {
    const isEdit = !!task?.id;

    console.log(11, task);
    if (isEdit) {
      handleEditTask(task);
    } else {
      handleAddTodo(task);
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
          onAdd={handleSubmitTodo}
          task={editedTask}
          isEdited={!!idTaskEdited}
          isSubmitting={isSubmitting}
        />
      </div>
      <div className="md:max-w-[60%] max-w-full mx-auto">
        {todos?.map((todo) => (
          <TodoItem
            className="mb-4"
            key={todo.id}
            onRemove={handleRemoveTodo}
            todo={todo}
            onToggle={handleToggleTodo}
            handleClickEdit={handleClickEdit}
            idTaskEdited={idTaskEdited}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        hasNext={hasNextPage}
        hasPrev={hasPreviousPage}
      />
    </div>
  );
};

export default TodoList;
