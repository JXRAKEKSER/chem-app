import { IUserRepo } from "../repositories/types";
import AuthService from "./auth.service";

const mockUserRepo: IUserRepo = {
  create: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
  getUserByUsername: jest.fn(),
  update: jest.fn(),
};

describe("AuthService", () => {
  it("succed create user", async () => {
    const userData = {
      username: "test@mail.ru",
      password: "12345678",
    };

    mockUserRepo.create = jest.fn().mockResolvedValueOnce({
      id: 1,
      username: userData.username,
      password: "hashPass",
      surname: null,
      name: null,
    });
    mockUserRepo.getUserByUsername = jest.fn().mockResolvedValueOnce(null);
    const authService = new AuthService(mockUserRepo);
    const createdUser = await authService.registrate(userData);
    expect(createdUser).not.toEqual(null);
    expect(createdUser?.username).toEqual(userData.username);
  });

  it("username already in use", async () => {
    const userData = {
      username: "test@mail.ru",
      password: "12345678",
    };
    mockUserRepo.getUserByUsername = jest
      .fn()
      .mockResolvedValueOnce({ username: "test@mail.ru", name: "Jxra" });
    const authService = new AuthService(mockUserRepo);
    const createdUser = await authService.registrate(userData);
    expect(createdUser).toEqual(null);
  });

  it("get user data", async () => {
    const userId = 1;
    mockUserRepo.getById = jest
      .fn()
      .mockResolvedValue({
        id: 1,
        username: "TheFirstUser",
        password: "hashPass",
        surname: null,
        name: null,
      });
      const authService = new AuthService(mockUserRepo);
      const userData = await authService.userMe(userId);

      expect(userData?.id).toEqual(userId);
  });

  it("not found user", async () => {
    const userId = 1;
    mockUserRepo.getById = jest
      .fn()
      .mockResolvedValue(null);
      const authService = new AuthService(mockUserRepo);
      const userData = await authService.userMe(userId);

      expect(userData).toEqual(null);
  });
});
