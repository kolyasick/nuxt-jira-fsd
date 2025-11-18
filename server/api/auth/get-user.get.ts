import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN_NAME } from "~/app/constants/app.constants";
import { prisma } from "~/shared/lib";
import { User } from "~~/prisma/generated/prisma/client";

export default defineEventHandler(async (event) => {
  const headers = getHeader(event, "Authorization");
  const accessToken = headers?.split(" ")[1];

  if (!accessToken) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const decoded: Omit<User, "password"> = jwtDecode(accessToken);

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
    omit: {
      password: true,
    },
  });

  return user;
});
