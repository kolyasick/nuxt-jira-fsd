import {
  REFRESH_TOKEN_NAME,
  ACCESS_TOKEN_NAME,
} from "~/app/constants/app.constants";
import { prisma } from "~/shared/lib";

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, REFRESH_TOKEN_NAME);

  if (!refreshToken) return;

  await prisma.refreshToken.deleteMany({
    where: {
      token: refreshToken,
    },
  });

  deleteCookie(event, REFRESH_TOKEN_NAME);

  return {
    success: true,
  };
});
