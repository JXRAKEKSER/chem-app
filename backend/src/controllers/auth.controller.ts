import { Request, Response, NextFunction } from "express";

import AuthService from "../core/User/services/auth.service";
import UserRepo from "../core/User/repositories/user.repository";

import JwtFabric from "../core/User/services/jwt.utils";

const registrate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const authService = new AuthService(new UserRepo());
    const createdUser = await authService.registrate({ username, password });
    if (!createdUser) {
      return res
        .status(409)
        .send({ message: "Пользователь с таким именем уже существует" });
    }
    return res.status(201).send({ ...createdUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Ошибка на сервере" });
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const authService = new AuthService(new UserRepo());
    const user = await authService.login({ username, password });
    if (!user) {
      return res
        .status(401)
        .send({ message: "Неправильное имя пользователя или пароль" });
    }
    const jwt = JwtFabric.createJwt({ id: user.id });

    return res.status(200).send({ jwt });
  } catch (error) {
    return res.status(500).send({ message: "Ошибка на сервере" });
  }
};

const getUserMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user;
    const authService = new AuthService(new UserRepo());
    const user = await authService.userMe(id);
    if (!user) {
      return res.status(404).send({ messege: "Пользователь не найден" });
    }
    return res.status(200).send({ ...user });
  } catch (error) {
    return res.status(500).send({ message: "Ошибка на сервере" });
  }
};

export { registrate, login, getUserMe };
