import { z } from "zod";

export const todoSchema = z.object({
  task: z.string().min(1, "Task cannot be empty").max(200, "Task too long"),
});

export type TTodoInputData = z.infer<typeof todoSchema>;
