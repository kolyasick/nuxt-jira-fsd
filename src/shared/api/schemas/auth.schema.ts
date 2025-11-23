import * as zod from "zod";

const passwordSchema = zod.string().min(6, { message: "Минимум 6 символов" });

export const formLoginSchema = zod.object({
  email: zod.email({ error: "Неверный формат e-mail" }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    zod.object({
      username: zod.string().min(2, { message: "Введите ваше имя" }),
      passwordRepeat: passwordSchema,
    })
  )
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Пароли не совпадают",
    path: ["passwordRepeat"],
  });

export type LoginForm = zod.infer<typeof formLoginSchema>;
export type RegisterForm = zod.infer<typeof formRegisterSchema>;
