import type { TTask } from "../../types/entities/task.entity";
import REQUEST from "../../utils/request";

export const useCreateTask = REQUEST.trigger<unknown, Partial<TTask>>(
  "/tasks",
  "PATCH"
);
