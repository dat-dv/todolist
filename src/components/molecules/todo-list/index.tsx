import React, { useMemo, useState } from "react";
import TodoInput from "./todo-input";
import type { TTask } from "../../../types/entities/task.entity";
import { toast } from "react-toastify";
import TodoItem from "./todo-item";

const TodoList = () => {
  const [idTaskEdited, setTaskIdEdited] = useState<number | undefined>(
    undefined
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const todos: TTask[] = [
    {
      id: 1,
      title:
        " Sample TodoSample TodoSample TodoSample TodoSample TodoSample TodoSample TodoSample TodoSample TodoSample TodoSample TodoSample TodoSample TodoSample TodoSample TodoSample TodoSample TodoSample Todo",
      isCompleted: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
    },
    {
      id: 2,
      title: "Another Todo",
      isCompleted: true,
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    },
  ];
  const editedTask = useMemo(() => {
    return todos.find((todo) => todo.id === idTaskEdited);
  }, [todos, idTaskEdited]);

  const handleAddTodo = (task: Partial<TTask>) => {
    const isEdit = !!task?.id;
    if (isEdit) {
      toast.success("Todo updated successfully");
    } else {
      toast.success("Todo added successfully");
    }
  };

  const handleRemoveTodo = (id: number) => {
    toast.success("Todo removed successfully");
  };

  const handleToggleTodo = (id: number, isCompleted: boolean) => {
    toast.success("Todo toggled successfully");
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
