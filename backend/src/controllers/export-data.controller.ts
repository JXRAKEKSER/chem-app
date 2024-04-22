import { Request, Response, NextFunction } from "express";

import ValidationError from "../errors/ValidationError";
import type { predictedDrug } from "../core/Predict/api/predict.api";

import fileCreatorFactory, {
  CREATOR_TYPES,
} from "../utils/FileCreator/FileCreatorFactory";

const exportFromPredictedList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type } = req.query;
    const exportData: predictedDrug[] = req.body.predictedDrugs;

    if (type !== "csv") {
      throw new ValidationError("Неподдерживаемый формат экспорта");
    }
    const heads = ["smiles", "prediction"];
    const body = exportData.reduce(
      (items: string[], { formula, prediction }) => {
        return [...items, formula, String(prediction)];
      },
      []
    );

    const fileCreator = fileCreatorFactory.create(CREATOR_TYPES.CSV);
    const fileBuffer = fileCreator.createFile({ headers: heads, rows: body });
    res.set("Content-Type", "text/csv");
    res.send(fileBuffer);
  } catch (error) {
    next(error);
  }
};

export { exportFromPredictedList };
