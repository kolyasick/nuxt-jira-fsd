import { ROUTES } from "~/app/routes/app.routes";
import { signOut } from "~/shared/api";
import { useAuthStore } from "~/shared/stores/auth.store";

export const logout = () => {
  const authStore = useAuthStore();
  const toast = useToast();

  signOut()
    .then(() => {
      toast.add({
        title: "You're logged-out",
        color: "info",
        icon: "si:sign-out-fill",
      });
      authStore.logout();
    })
    .then(() => {
      navigateTo(ROUTES.AUTH);
    });
};
