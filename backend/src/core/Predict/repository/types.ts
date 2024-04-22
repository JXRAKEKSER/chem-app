import { PredictionModel } from "@prisma/client";
import { filePredictEntity, predictedDrug } from "../api/predict.api";

interface IPredictRepo {
  singlePredict(formula: string): Promise<number>;
  filePredict(fileBuffer: Buffer): Promise<filePredictEntity>;
  createPredict(predictionDto: {
    formula: string;
    userId: number;
    prediction: number;
  }): Promise<PredictionModel>;
  getSavedPredictions(userId: number): Promise<predictedDrug>;
}

export { IPredictRepo };
