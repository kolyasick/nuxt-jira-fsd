import { useAuthStore } from "~/shared/stores/auth.store";
import { ROUTES } from "../routes/app.routes";
import { ACCESS_TOKEN_NAME } from "../constants/app.constants";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const isAuth = useCookie(ACCESS_TOKEN_NAME);

  if (to.path !== ROUTES.AUTH && !isAuth.value) {
    return navigateTo(ROUTES.AUTH);
  }

  if (to.path === ROUTES.AUTH && isAuth.value) {
    return navigateTo(ROUTES.HOME);
  }

  // if (to.path === "/") {
  //   return navigateTo("/welcome");
  // }
});
