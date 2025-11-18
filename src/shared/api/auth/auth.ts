import type { AuthResponse } from "~/entities/auth/model";
import type { LoginForm, RegisterForm } from "../schemas/auth.schema";
import type { User } from "~~/prisma/generated/prisma/client";
import api from "~/app/config/axios";
import { ACCESS_TOKEN_NAME } from "~/app/constants/app.constants";

export function signUp(data: RegisterForm) {
  return api.post<AuthResponse>("/auth/register", data);
}

export function signIn(data: LoginForm) {
  return api.post<AuthResponse>("/auth/login", data);
}

export function signOut() {
  return api.get("/auth/logout");
}

export function getUser() {
  const token = useCookie(ACCESS_TOKEN_NAME);
  return api.get<Omit<User, "password">>("/auth/get-user", {
    headers: {
      Authorization: token.value ? "Bearer " + token.value : undefined,
    },
  });
}
