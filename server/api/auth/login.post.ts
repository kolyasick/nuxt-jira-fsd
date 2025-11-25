import { formLoginSchema } from "@widgets/auth/model";
import { prisma } from "@shared/lib";
import { compareSync } from "bcrypt";
import {
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
} from "~/app/constants/app.constants";
import tokenService from "~~/server/services/token.service";

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, (data) =>
    formLoginSchema.parse(data)
  );

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid credentials",
    });
  }

  const { password: userPassword, ...userData } = user;

  const isPasswordCorrect = compareSync(password, user?.password);

  if (!isPasswordCorrect) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid credentials",
    });
  }

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
    user: userData,
    ...tokens,
  };
});
