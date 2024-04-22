"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hash_utils_1 = __importDefault(require("./hash.utils"));
const config_service_1 = __importDefault(require("../../../infrastructure/config.service"));
const config_types_1 = require("../../../infrastructure/config.types");
class AuthService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    registrate(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUserExist = yield this.userRepo.getUserByUsername(user.username);
            console.log(user.username);
            console.log(isUserExist);
            if (isUserExist) {
                return null;
            }
            const salt = Number(config_service_1.default.get(config_types_1.ENV_VARIABLES.SALT));
            const hashedPassword = yield hash_utils_1.default.hash(user.password, salt);
            return this.userRepo.create(Object.assign(Object.assign({}, user), { password: hashedPassword }));
        });
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const supposeUser = yield this.userRepo.getUserByUsername(user.username);
            if (!supposeUser) {
                return null;
            }
            const isValidPassword = yield hash_utils_1.default.compare(user.password, supposeUser.password);
            if (!isValidPassword) {
                return null;
            }
            return supposeUser;
        });
    }
    userMe(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepo.getById(id);
        });
    }
}
exports.default = AuthService;
