import type { TTask } from "../../types/entities/task.entity";
import REQUEST from "../../utils/request";

export const useGetTasks = REQUEST.getList<TTask>("/tasks");
