import UserEntity from "../entity/user.entity";

export interface IUserRepo {
    registrate(user: createUserDto): Promise<UserEntity>;
    login(credentials: createUserDto): Promise<string>;
    getUser(): Promise<UserEntity>;
}

export type createUserDto = {
    username: string,
    password: string,
};
