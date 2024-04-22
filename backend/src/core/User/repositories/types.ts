import UserEntity from '../entities/user.entity';
import { UserModel } from '@prisma/client';

interface IUserRepo {
    getAll(): Promise<UserModel[]>;
    getById(id: number): Promise<UserModel | null>;
    getUserByUsername(username: string): Promise<UserModel | null>;
    create(user: UserEntity): Promise<UserModel>;
    update(user: UserEntity): Promise<UserModel>;
}

export { IUserRepo };
