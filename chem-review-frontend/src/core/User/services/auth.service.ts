import type { IUserRepo, createUserDto } from "@/core/User/repository/types";
import type UserEntity from "../entity/user.entity";

class AuthService {
  private readonly TOKEN_KEY: string = "token";

  constructor(private readonly userRepo: IUserRepo) {}

  public registrate(user: createUserDto): Promise<UserEntity> {
    return this.userRepo.registrate(user);
  }

  public async login(user: createUserDto): Promise<void> {
    const token = await this.userRepo.login(user);
    this.storeToken(token);
  }

  public getUser(): Promise<UserEntity> {
    return this.userRepo.getUser();
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
}

export default AuthService;
