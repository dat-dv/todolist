import z from "zod";

export const passwordSchema = z
  .string()
  .min(8, "8-32 characters required")
  .max(32, "8-32 characters required")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Must include A-Z, a-z, 0-9, @$!%*?&"
  );
export const usernameSchema = z
  .string()
  .min(3, "3-24 characters required")
  .max(24, "3-24 characters required")
  .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, underscore");

export const registerSchema = z
  .object({
    username: usernameSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
      });
    }
  });

export type TRegisterSchama = z.infer<typeof registerSchema>;
