import {
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
} from "@app/constants/app.constants";
import { formRegisterSchema } from "@shared/api";
import { prisma } from "@shared/lib";
import { hashSync } from "bcrypt";
import tokenService from "~~/server/services/token.service";

export default defineEventHandler(async (event) => {
  const { email, password, username } = await readValidatedBody(event, (data) =>
    formRegisterSchema.parse(data)
  );

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isUserExist) {
    throw createError({
      statusCode: 400,
      statusMessage: "User already exist",
    });
  }

  const passwordHash = hashSync(password, 5);
  const { password: userPassword, ...user } = await prisma.user.create({
    data: {
      email,
      username,
      password: passwordHash,
    },
  });

  const tokens = tokenService.generateTokens({
    id: user.id,
    username: user.username,
    email: user.email,
  });

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: tokens.refreshToken,
    },
  });

  setCookie(event, REFRESH_TOKEN_NAME, tokens.refreshToken, {
    httpOnly: true,
    secure: false,
  });

  return {
    user,
    ...tokens,
  };
});
