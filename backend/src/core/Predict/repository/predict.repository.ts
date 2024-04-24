import { IPredictRepo } from "./types";
import {
  fetchSinglePredicton,
  fetchFilePrediction,
  filePredictEntity,
  predictedDrug,
} from "../api/predict.api";

import { PredictionModel } from "@prisma/client";
import prismaService from "../../../database/prisma.service";

class PredictRepo implements IPredictRepo {
  private readonly prismaService = prismaService;

  public singlePredict(formula: string): Promise<number> {
    return fetchSinglePredicton(formula);
  }

  public async filePredict(fileBuffer: Buffer): Promise<filePredictEntity> {
    const { predicted_drugs, invalid_drugs } = await fetchFilePrediction(
      fileBuffer
    );
    const predictedDrugs = Object.keys(predicted_drugs).map(
      (drugFormula): predictedDrug => {
        return {
          formula: drugFormula,
          prediction: predicted_drugs[drugFormula],
        };
      }
    );
    return { predictedDrugs, invalidDrugs: invalid_drugs };
  }

  public createPredict(predictionDto: {
    formula: string;
    userId: number;
    prediction: number;
  }): Promise<PredictionModel> {
    return this.prismaService.client.predictionModel.create({
      data: { ...predictionDto },
    });
  }

  public async getSavedPredictions(userId: number): Promise<predictedDrug[]> {
    return (
      await this.prismaService.client.predictionModel.findMany({
        where: { userId },
      })
    ).map(({ prediction, formula }) => {
      return { prediction, formula };
    });
  }
}

export default PredictRepo;
