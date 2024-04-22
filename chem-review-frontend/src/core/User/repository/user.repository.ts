import UserEntity from "../entity/user.entity";
import type { IUserRepo, createUserDto } from "./types";

import { registratate, login, fetchUserData } from "@/api/auth.api";

class UserRepo implements IUserRepo {
  public registrate(user: createUserDto): Promise<UserEntity> {
    return registratate(user);
  }

  public async login(credentials: createUserDto): Promise<string> {
    const { jwt } = await login(credentials);
    return jwt;
  }

  public getUser(): Promise<UserEntity> {
    return fetchUserData();
  }
}

export default UserRepo;
