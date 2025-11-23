import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN_NAME } from "../constants/app.constants";

export default defineNuxtRouteMiddleware((to, from) => {
  const authPath = "/auth";

  const token = useCookie(ACCESS_TOKEN_NAME);
  const isAuth = token.value;

  if (to.path !== authPath && !isAuth) {
    return navigateTo(authPath);
  }

  if (to.path === authPath && isAuth) {
    return navigateTo("/dashboard");
  }
});
