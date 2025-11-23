import { REFRESH_TOKEN_NAME } from "~/app/constants/app.constants";
import { prisma } from "~/shared/lib";
import tokenService from "~~/server/services/token.service";

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, REFRESH_TOKEN_NAME);

  if (!refreshToken) {
    throw createError({
      statusCode: 400,
      statusMessage: "Refresh token were not found",
    });
  }

  tokenService.verifyToken(refreshToken, true);

  const user = await prisma.user.findFirst({
    where: {
      refreshToken: {
        some: {
          token: refreshToken,
        },
      },
    },
    omit: {
      password: true,
    },
  });

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: "User were not found",
    });
  }

  const tokens = tokenService.generateTokens({
    email: user.email,
    id: user.id,
    username: user.username,
  });

  return {
    ...tokens,
  };
});
