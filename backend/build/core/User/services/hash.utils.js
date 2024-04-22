"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
class HashUtils {
    static hash(payload, salt) {
        return (0, bcryptjs_1.hash)(payload, salt);
    }
    static hashSync(payload, salt) {
        return (0, bcryptjs_1.hashSync)(payload, salt);
    }
    static compare(comparableValue, hashValue) {
        return (0, bcryptjs_1.compare)(comparableValue, hashValue);
    }
}
exports.default = HashUtils;
