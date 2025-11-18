import type { User } from "~~/prisma/generated/prisma/client";

export type AuthResponse = {
  user: Omit<User, "password">;
  accessToken: string;
  refreshToken: string;
};


