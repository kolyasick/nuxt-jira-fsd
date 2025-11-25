import { ACCESS_TOKEN_NAME } from "~/app/constants/app.constants";
import type { User } from "~~/prisma/generated/prisma/client";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<Omit<User, "password"> | null>(null);

  function setUser(data: Omit<User, "password"> | null) {
    user.value = data;
  }

  function setToken(accessToken: string | null) {
    useCookie(ACCESS_TOKEN_NAME).value = accessToken;
  }

  function login(user: Omit<User, "password">, accessToken?: string) {
    useCookie(ACCESS_TOKEN_NAME).value = accessToken;
    setUser(user);
  }

  function logout() {
    useCookie(ACCESS_TOKEN_NAME).value = null;
    setUser(null);
  }

  return {
    user,
    login,
    logout,
    setUser,
    setToken,
  };
});
