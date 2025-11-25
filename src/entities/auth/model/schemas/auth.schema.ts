import * as zod from "zod";

const passwordSchema = zod.string().min(6, { message: "At least 6 symbols" });

export const formLoginSchema = zod.object({
  email: zod.email({ error: "Invalid e-mail" }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    zod.object({
      username: zod.string().min(2, { message: "Type your name" }),
      passwordRepeat: passwordSchema,
    })
  )
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Passwords don't match",
    path: ["passwordRepeat"],
  });

export type LoginForm = zod.infer<typeof formLoginSchema>;
export type RegisterForm = zod.infer<typeof formRegisterSchema>;
