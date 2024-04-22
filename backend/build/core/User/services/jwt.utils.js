"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const config_service_1 = __importDefault(require("../../../infrastructure/config.service"));
const config_types_1 = require("../../../infrastructure/config.types");
class JwtFabric {
    static createJwt(payload, config = { algorithm: "HS256", expiresIn: "8h" }) {
        return (0, jsonwebtoken_1.sign)(payload, JwtFabric.SECRET_KEY, {
            algorithm: config.algorithm,
            expiresIn: config.expiresIn,
        });
    }
    static getPayload(jwt) {
        try {
            return (0, jsonwebtoken_1.verify)(jwt, this.SECRET_KEY);
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
                return null;
            }
            throw error;
        }
    }
}
JwtFabric.SECRET_KEY = config_service_1.default.get(config_types_1.ENV_VARIABLES.JWT_SECRET);
exports.default = JwtFabric;
