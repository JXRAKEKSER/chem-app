import { createHttpInstance } from "@/api/http/api.config";
import type UserEntity from "@/core/User/entity/user.entity";
import type { createUserDto } from "@/core/User/repository/types";

export type loginResponse = {
  jwt: string;
};

const registratate = async (user: createUserDto): Promise<UserEntity> => {
  try {
    const http = createHttpInstance();
    const { data } = await http.post<UserEntity>("/auth/register", user);
    return data;
  } catch (error) {
    throw error;
  }
};

const login = async (credentials: createUserDto): Promise<loginResponse> => {
  try {
    const http = createHttpInstance();
    const { data } = await http.post<loginResponse>("/auth/login", credentials);
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchUserData = async () => {
  try {
    const http = createHttpInstance();
    const { data } = await http.get<UserEntity>("/auth/me");
    return data;
  } catch (error) {
    throw error;
  }
};

export { registratate, login, fetchUserData };
