"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_service_1 = __importDefault(require("../../../database/prisma.service"));
class UserRepo {
    constructor() {
        this.prismaClient = prisma_service_1.default;
    }
    getAll() {
        throw new Error("Method not implemented.");
    }
    getById(id) {
        return this.prismaClient.client.userModel.findFirst({ where: { id } });
    }
    getUserByUsername(username) {
        return this.prismaClient.client.userModel.findFirst({ where: { username } });
    }
    create({ username, password }) {
        return this.prismaClient.client.userModel.create({ data: { username, password } });
    }
    update(user) {
        throw new Error("Method not implemented.");
    }
}
exports.default = UserRepo;
