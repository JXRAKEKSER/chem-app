import UserEntity from "../entities/user.entity";
import { UserModel } from "@prisma/client";
import { IUserRepo } from "./types";

import prismaService from "../../../database/prisma.service";

class UserRepo implements IUserRepo {
  private prismaClient;

  constructor() {
    this.prismaClient = prismaService;
  }
  public getAll(): Promise<UserModel[]> {
    throw new Error("Method not implemented.");
  }
  public getById(id: number): Promise<UserModel | null> {
    return this.prismaClient.client.userModel.findFirst({ where: { id } });
  }
  public getUserByUsername(username: string): Promise<UserModel | null> {
    return this.prismaClient.client.userModel.findFirst({ where: { username } })
  }
  public create({ username, password }: UserEntity): Promise<UserModel> {
    return this.prismaClient.client.userModel.create({ data: { username, password } });
  }
  public update(user: UserEntity): Promise<UserModel> {
    throw new Error("Method not implemented.");
  }
}

export default UserRepo;
