
import { prisma } from "~/shared/lib";
import tokenService from "~~/server/services/token.service";

export default defineEventHandler(async (event) => {
  const headers = getHeader(event, "Authorization");
  const accessToken = headers?.split(" ")[1];

  if (!accessToken) {
    throw createError({
      statusCode: 400,
      statusMessage: "Auth token required",
    });
  }

  let decoded = tokenService.verifyToken(accessToken);

  const user = await prisma.user.findUnique({
    where: {
      id: decoded?.id,
    },
    omit: {
      password: true,
    },
  });

  return user;
});
