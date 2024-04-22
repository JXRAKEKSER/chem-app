"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHttpError = void 0;
const isHttpError = (error) => {
    if (typeof error == 'object' && error && 'statusCode' in error) {
        return true;
    }
    return false;
};
exports.isHttpError = isHttpError;
