import { JsonWebTokenError, sign, verify } from "jsonwebtoken";
import configService from "../../../infrastructure/config.service";
import { ENV_VARIABLES } from "../../../infrastructure/config.types";

type jwtConfig = {
  algorithm?: "HS512" | "HS256";
  expiresIn?: string | number;
};
type tokenPayload = {
  id: number;
};

class JwtFabric {
  private static SECRET_KEY = configService.get(ENV_VARIABLES.JWT_SECRET);

  public static createJwt(
    payload: tokenPayload,
    config: jwtConfig = { algorithm: "HS256", expiresIn: "8h" }
  ): string {
    return sign(payload, JwtFabric.SECRET_KEY, {
      algorithm: config.algorithm,
      expiresIn: config.expiresIn,
    });
  }
  public static getPayload(jwt: string): tokenPayload | null {
    try {
      return verify(jwt, this.SECRET_KEY) as tokenPayload;
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        return null;
      }
      throw error;
    }
  }
}

export default JwtFabric;
