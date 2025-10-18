import { z } from "zod";

export const todoSchema = z.object({
  task: z.string().max(255, "Task too long"),
});

export type TTodoInputData = z.infer<typeof todoSchema>;
