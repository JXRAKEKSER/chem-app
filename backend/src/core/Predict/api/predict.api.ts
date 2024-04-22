import axios, { AxiosError } from "axios";
import FormData from "form-data";

import configService from "../../../infrastructure/config.service";
import { ENV_VARIABLES } from "../../../infrastructure/config.types";

export type predictedDrug = {
  formula: string;
  prediction: number;
};

export type invalidDrug = string;

export type singlePrediction = {
  prediction: number;
};

export type filePredictionResponse = {
  predicted_drugs: { [key: string]: number };
  invalid_drugs: invalidDrug[];
};

export type filePredictEntity = {
  predictedDrugs: predictedDrug[];
  invalidDrugs: invalidDrug[];
};

const predictionUrl = configService.get(ENV_VARIABLES.PREDICTION_SERVICE_URL);

const fetchSinglePredicton = async (drug: string): Promise<number> => {
  try {
    const { data } = await axios.post<singlePrediction>(
      `${predictionUrl}/prediction`,
      {
        chemical_formula: drug,
      }
    );
    return data.prediction;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
    }
    throw error;
  }
};

const fetchFilePrediction = async (file: Buffer) => {
  const form = new FormData();
  form.append("file", file);
  try {
    const { data } = await axios.post<filePredictionResponse>(
      `${predictionUrl}/prediction/csv`,
      form
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export { fetchSinglePredicton, fetchFilePrediction, };
