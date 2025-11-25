import { useQuery } from "@tanstack/vue-query";
import { ACCESS_TOKEN_NAME } from "~/app/constants/app.constants";
import { getUser } from "~/shared/api";
import { useAuthStore } from "~/shared/stores/auth.store";

export const getProfile = async () => {
  const authStore = useAuthStore();
  const token = useCookie(ACCESS_TOKEN_NAME);
  
  const { data, suspense, isLoading } = useQuery({
    queryKey: ["profile", token.value],
    queryFn: async () => {
      const { data } = await getUser();
      if (data) {
        authStore.setUser(data);
      }
      return data;
    },
    staleTime: 30 * 60 * 1000,
    retry: false,
  });

  await suspense();

  // watch(data, () => {
  //   if (data.value) authStore.login(data.value);
  // });

  return { isLoading, user: data };
};
