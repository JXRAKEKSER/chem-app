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
exports.getUserMe = exports.login = exports.registrate = void 0;
const auth_service_1 = __importDefault(require("../core/User/services/auth.service"));
const user_repository_1 = __importDefault(require("../core/User/repositories/user.repository"));
const jwt_utils_1 = __importDefault(require("../core/User/services/jwt.utils"));
const registrate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const authService = new auth_service_1.default(new user_repository_1.default());
        const createdUser = yield authService.registrate({ username, password });
        if (!createdUser) {
            return res
                .status(409)
                .send({ message: "Пользователь с таким именем уже существует" });
        }
        return res.status(201).send(Object.assign({}, createdUser));
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Ошибка на сервере" });
    }
});
exports.registrate = registrate;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const authService = new auth_service_1.default(new user_repository_1.default());
        const user = yield authService.login({ username, password });
        if (!user) {
            return res
                .status(401)
                .send({ message: "Неправильное имя пользователя или пароль" });
        }
        const jwt = jwt_utils_1.default.createJwt({ id: user.id });
        return res.status(200).send({ jwt });
    }
    catch (error) {
        return res.status(500).send({ message: "Ошибка на сервере" });
    }
});
exports.login = login;
const getUserMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const authService = new auth_service_1.default(new user_repository_1.default());
        const user = yield authService.userMe(id);
        if (!user) {
            return res.status(404).send({ messege: "Пользователь не найден" });
        }
        return res.status(200).send(Object.assign({}, user));
    }
    catch (error) {
        return res.status(500).send({ message: "Ошибка на сервере" });
    }
});
exports.getUserMe = getUserMe;
