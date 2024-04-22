"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_utils_1 = __importDefault(require("../core/User/services/jwt.utils"));
const UnauthorizedError_1 = __importDefault(require("../errors/UnauthorizedError"));
exports.default = (req, res, next) => {
    const { authorization } = req.headers;
    if (typeof authorization === "undefined") {
        return next(new UnauthorizedError_1.default("Не авторизован"));
    }
    const [, token] = authorization.split(" ");
    try {
        const payload = jwt_utils_1.default.getPayload(token);
        if (!payload) {
            return next(new UnauthorizedError_1.default("Не авторизован"));
        }
        req.user = payload;
        next();
    }
    catch (error) {
        next(error);
    }
};
