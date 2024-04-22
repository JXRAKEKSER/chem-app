import { Request, Response, NextFunction } from "express";

import PredictService from "../core/Predict/services/predict.service";
import PredictRepo from "../core/Predict/repository/predict.repository";
import { fetchFilePrediction } from "../core/Predict/api/predict.api";

const getSinglePrediction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { formula, savePrediction } = req.body;
  const { id: userId } = req.user;

  try {
    const predictService = new PredictService(new PredictRepo());
    const prediction = await predictService.getSinglePredict(
      {
        formula,
        userId,
      },
      savePrediction
    );
    return res.status(200).json({ formula, prediction });
  } catch (error) {
    next(error);
  }
};

const getFilePredict = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const csvFile = req.file as Express.Multer.File;
    const predictService = new PredictService(new PredictRepo());
    const { predictedDrugs, invalidDrugs } =
      await predictService.getFilePredict(csvFile.buffer);
    return res.status(200).json({ predictedDrugs, invalidDrugs });
  } catch (error) {
    next(error);
  }
};

export { getSinglePrediction, getFilePredict };
