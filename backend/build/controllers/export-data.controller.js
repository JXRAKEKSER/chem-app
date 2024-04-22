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
exports.exportFromPredictedList = void 0;
const ValidationError_1 = __importDefault(require("../errors/ValidationError"));
const FileCreator_1 = __importDefault(require("../utils/FileCreator/FileCreator"));
const exportFromPredictedList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type } = req.query;
        const exportData = req.body.predictedDrugs;
        if (type !== "csv") {
            throw new ValidationError_1.default("Неподдерживаемый формат экспорта");
        }
        const heads = ["smiles", "prediction"];
        const body = exportData.reduce((items, { formula, prediction }) => {
            return [...items, formula, String(prediction)];
        }, []);
        const fileCreator = new FileCreator_1.default(heads, body);
        const fileBuffer = fileCreator.createCsv();
        res.set("Content-Type", "text/csv");
        res.send(fileBuffer);
    }
    catch (error) {
        next(error);
    }
});
exports.exportFromPredictedList = exportFromPredictedList;
