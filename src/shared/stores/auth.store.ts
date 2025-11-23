import type { User } from "~~/prisma/generated/prisma/client";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<Omit<User, "password"> | null>(null);

  function setUser(data: Omit<User, "password"> | null) {
    user.value = data;
  }
  return {
    user,
    setUser
  };
});
