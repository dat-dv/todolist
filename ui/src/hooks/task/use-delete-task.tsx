import REQUEST from "../../utils/request";

export const useDeleteTask = REQUEST.trigger("/tasks", "DELETE");
