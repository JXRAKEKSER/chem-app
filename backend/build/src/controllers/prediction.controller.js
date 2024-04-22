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
exports.getFilePredict = exports.getSinglePrediction = void 0;
const predict_service_1 = __importDefault(require("../core/Predict/services/predict.service"));
const predict_repository_1 = __importDefault(require("../core/Predict/repository/predict.repository"));
const getSinglePrediction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { formula, savePrediction } = req.body;
    const { id: userId } = req.user;
    try {
        const predictService = new predict_service_1.default(new predict_repository_1.default());
        const prediction = yield predictService.getSinglePredict({
            formula,
            userId,
        }, savePrediction);
        return res.status(200).json({ formula, prediction });
    }
    catch (error) {
        next(error);
    }
});
exports.getSinglePrediction = getSinglePrediction;
const getFilePredict = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const csvFile = req.file;
        const predictService = new predict_service_1.default(new predict_repository_1.default());
        const { predictedDrugs, invalidDrugs } = yield predictService.getFilePredict(csvFile.buffer);
        return res.status(200).json({ predictedDrugs, invalidDrugs });
    }
    catch (error) {
        next(error);
    }
});
exports.getFilePredict = getFilePredict;
