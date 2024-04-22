"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeGuard_1 = require("../errors/typeGuard");
exports.default = (error, req, res, next) => {
    if ((0, typeGuard_1.isHttpError)(error)) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    console.log(error);
    return res.status(500).json({ message: 'Ошибка на сервере' });
};
