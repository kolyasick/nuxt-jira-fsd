import { ACCESS_TOKEN_NAME } from "~/app/constants/app.constants";
import { ROUTES } from "~/app/routes/app.routes";
import { signOut } from "~/shared/api";
import { useAuthStore } from "~/shared/stores/auth.store";

export const logout = () => {
  const authStore = useAuthStore();
  const cookie = useCookie(ACCESS_TOKEN_NAME);
  const toast = useToast();

  signOut()
    .then(() => {
      cookie.value = null;
      toast.add({
        title: "Вы вышли из аккаунта",
        color: "info",
        icon: "si:sign-out-fill",
      });
      authStore.setUser(null);
    })
    .then(() => {
      navigateTo(ROUTES.AUTH);
    });
};
