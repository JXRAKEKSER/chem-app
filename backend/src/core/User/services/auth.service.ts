import { UserModel } from "@prisma/client";
import { IUserRepo } from "../repositories/types";

import HashUtils from "./hash.utils";
import configService from "../../../infrastructure/config.service";
import { ENV_VARIABLES } from "../../../infrastructure/config.types";

class AuthService {
  constructor(private readonly userRepo: IUserRepo) {}

  public async registrate(user: {
    username: string;
    password: string;
  }): Promise<UserModel | null> {
    const isUserExist = await this.userRepo.getUserByUsername(user.username);
    console.log(user.username);
    console.log(isUserExist);
    if (isUserExist) {
      return null;
    }

    const salt = Number(configService.get(ENV_VARIABLES.SALT));
    const hashedPassword = await HashUtils.hash(user.password, salt);
    return this.userRepo.create({ ...user, password: hashedPassword });
  }

  public async login(user: {
    username: string;
    password: string;
  }): Promise<UserModel | null> {
    const supposeUser = await this.userRepo.getUserByUsername(user.username);
    if (!supposeUser) {
      return null;
    }

    const isValidPassword = await HashUtils.compare(
      user.password,
      supposeUser.password
    );
    if (!isValidPassword) {
      return null;
    }
    return supposeUser;
  }

  public async userMe(id: number): Promise<UserModel | null> {
    return this.userRepo.getById(id);
  }
}

export default AuthService;
