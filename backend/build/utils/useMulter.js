"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneFieldParser = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const formDataParser = (0, multer_1.default)({ storage });
const oneFieldParser = (fieldName, isMultiparse = false) => {
    // isMultiparse - опция для парсинга нескольких изображений на одном поле
    if (isMultiparse) {
        return formDataParser.array(fieldName);
    }
    return formDataParser.single(fieldName);
};
exports.oneFieldParser = oneFieldParser;
