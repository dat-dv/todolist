import type { TTask } from "../../types/entities/task.entity";
import REQUEST from "../../utils/request";

export const useUpdateTask = REQUEST.trigger<unknown, Partial<TTask>>(
  "/tasks",
  "PUT"
);
