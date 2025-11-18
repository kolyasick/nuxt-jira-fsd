import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN_NAME } from "../constants/app.constants";

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie(ACCESS_TOKEN_NAME);
  const isAuth = token.value;
  if (to.path === "/" && !isAuth) {
    return navigateTo("/auth");
  }

  if (to.path === "/auth" && isAuth) {
    return navigateTo("/");
  }
});
