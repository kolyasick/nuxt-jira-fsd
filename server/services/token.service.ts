import jwt, { JsonWebTokenError } from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "@app/constants/app.constants";

export type JwtPayload = {
  id: string;
  email: string;
  username: string;
};

type TokensReturn = {
  accessToken: string;
  refreshToken: string;
};

class TokenService {
  private ACCESS_TOKEN_SECRET = ACCESS_TOKEN_SECRET;
  private REFRESH_TOKEN_SECRET = REFRESH_TOKEN_SECRET;

  generateTokens(payload: JwtPayload): TokensReturn {
    const accessToken = jwt.sign(payload, this.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });

    const refreshToken = jwt.sign(payload, this.REFRESH_TOKEN_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  verifyToken(token: string, isRefresh: boolean = false): JwtPayload {
    try {
      return jwt.verify(
        token,
        isRefresh ? REFRESH_TOKEN_SECRET : ACCESS_TOKEN_SECRET
      ) as JwtPayload;
    } catch (error) {
      const err = error as JsonWebTokenError;
      throw createError({
        statusCode: 401,
        statusMessage: err.name,
      });
    }
  }
}

export default new TokenService();
