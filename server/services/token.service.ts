import { type H3Event } from "h3";

import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_NAME,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_NAME,
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
      expiresIn: "5m",
    });

    const refreshToken = jwt.sign(payload, this.REFRESH_TOKEN_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

}

export default new TokenService();
