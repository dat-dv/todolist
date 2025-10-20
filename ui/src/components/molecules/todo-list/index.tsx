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
import ConfirmDeleteDialog from "../confirm-dialog-delete";
import {
  PAGINATION,
  PAGINATION_SIZE_OPTIONS,
} from "../../../configs/pagination.config";
import TodoFilter from "./todo-filter";
import { EFIlterValue, ESortOrder } from "../../../types/filter.enum";
import type { TFilterTask } from "./todo-item.type";

const TodoList = () => {
  const [idTaskEdited, setTaskIdEdited] = useState<number | undefined>(
    undefined
  );
  const [deleteDialog, setDeleteDialog] = useState<{
    todoId: number | null;
    todoTitle: string | null;
  }>({
    todoId: null,
    todoTitle: null,
  });

  const [filters, setFilters] = useState<TFilterTask>({
    page: PAGINATION.DEFAULT_PAGE,
    pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
    isCompleted: EFIlterValue.ALL,
    search: "",
    sortOrder: ESortOrder.NEWEST,
  });

  const { trigger: trigerCreatTask, isMutating: isCreating } = useCreateTask({
    shouldFetch: true,
  });

  const { trigger: triggerDeleteTask, isMutating: isDeleting } = useDeleteTask({
    shouldFetch: true,
  });
  const { trigger: triggerUpdateTask } = useUpdateTask({
    shouldFetch: true,
  });

  const isSubmitting = isCreating;

  const { data: tasskRes, mutate: revalidateTasks } = useGetTasks({
    shouldFetch: true,
    params: {
      page: filters.page,
      pageSize: filters.pageSize,
      isCompleted: filters.isCompleted,
      search: filters.search,
      sortOrder: filters.sortOrder,
    },
  });

  const {
    value: todos = [],
    totalPages = PAGINATION.DEFAULT_PAGE,
    hasNextPage,
    hasPreviousPage,
    count,
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
    setTaskIdEdited(undefined);
  };

  const handleSubmitTodo = async (task: Partial<TTask>) => {
    const isEdit = !!task?.id;

    if (isEdit) {
      handleEditTask(task);
    } else {
      handleAddTodo(task);
    }
  };

  const handleOpenConfirmDelete = async (task: TTask) => {
    setDeleteDialog({
      todoId: task.id,
      todoTitle: task.title,
    });
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
    toast.success(
      `Todo ${isCompleted ? "completed" : "marked as incomplete"} successfully`
    );
    revalidateTasks();
  };

  const handleClickEdit = (id?: number) => {
    setTaskIdEdited(id);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialog({ todoId: null, todoTitle: null });
  };

  const handleConfirmDelete = async () => {
    const res = await triggerDeleteTask({
      extendUrl: `/${deleteDialog.todoId}`,
    });
    if (res.status !== "success") {
      toast.error("Failed to remove todo");
      return;
    }
    revalidateTasks();
    handleCloseDeleteDialog();
    toast.success("Todo removed successfully");
  };

  const handleChangePage = (page: number) => {
    setFilters({ ...filters, page });
  };

  const handleChangePageSize = (pageSize: number) => {
    setFilters({ ...filters, pageSize, page: PAGINATION.DEFAULT_PAGE });
  };

  const handleChangeFilter = (data: Partial<TFilterTask>) => {
    setFilters({ ...filters, ...data });
  };

  return (
    <div>
      <TodoFilter
        filter={filters}
        onFilterChange={handleChangeFilter}
        totalCount={count}
      />
      <TodoInput
        onAdd={handleSubmitTodo}
        task={editedTask}
        isEdited={!!idTaskEdited}
        isSubmitting={isSubmitting}
        className="sm:max-w-md max-w-full mx-auto mb-6"
      />
      <div className="md:max-w-xl max-w-full mx-auto">
        {todos?.map((todo, index) => {
          const todoIndex = (filters.page - 1) * filters.pageSize + index + 1;
          return (
            <TodoItem
              className="mb-4"
              key={todo.id}
              onClickDelete={handleOpenConfirmDelete}
              todo={todo}
              title={`${todoIndex}. ${todo.title}`}
              onToggle={handleToggleTodo}
              handleClickEdit={handleClickEdit}
              idTaskEdited={idTaskEdited}
            />
          );
        })}
      </div>
      <Pagination
        currentPage={filters.page}
        totalPages={totalPages}
        onPageChange={handleChangePage}
        hasNext={hasNextPage}
        hasPrev={hasPreviousPage}
        pageSize={filters.pageSize}
        onChangePageSize={handleChangePageSize}
        selectProps={{
          options: PAGINATION_SIZE_OPTIONS,
        }}
      />
      <ConfirmDeleteDialog
        isOpen={deleteDialog.todoId !== null}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        itemName={deleteDialog.todoTitle || ""}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default TodoList;
