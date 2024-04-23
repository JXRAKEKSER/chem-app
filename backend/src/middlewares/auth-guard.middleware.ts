import { Request, Response, NextFunction } from "express";

import JwtUtils from "../core/User/services/jwt.utils";

import UnauthorizedError from "../errors/UnauthorizedError";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (typeof authorization === "undefined") {
    return next(new UnauthorizedError("Не авторизован"));
  }
  const [, token] = authorization.split(" ");
  try {
    const payload = await JwtUtils.getPayload(token);
    if (!payload) {
      return next(new UnauthorizedError("Не авторизован"));
    }
    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};
