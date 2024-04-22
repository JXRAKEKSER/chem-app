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
const predict_api_1 = require("../api/predict.api");
const prisma_service_1 = __importDefault(require("../../../database/prisma.service"));
class PredictRepo {
    constructor() {
        this.prismaService = prisma_service_1.default;
    }
    singlePredict(formula) {
        return (0, predict_api_1.fetchSinglePredicton)(formula);
    }
    filePredict(fileBuffer) {
        return __awaiter(this, void 0, void 0, function* () {
            const { predicted_drugs, invalid_drugs } = yield (0, predict_api_1.fetchFilePrediction)(fileBuffer);
            const predictedDrugs = Object.keys(predicted_drugs).map((drugFormula) => {
                return {
                    formula: drugFormula,
                    prediction: predicted_drugs[drugFormula],
                };
            });
            return { predictedDrugs, invalidDrugs: invalid_drugs };
        });
    }
    createPredict(predictionDto) {
        return this.prismaService.client.predictionModel.create({
            data: Object.assign({}, predictionDto),
        });
    }
    getSavedPredictions(userId) {
        throw new Error("not implemented");
    }
}
exports.default = PredictRepo;
