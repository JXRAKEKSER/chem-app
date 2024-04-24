import { createHttpInstance } from "./http/api.config";

export type singlePredictionResponse = {
  formula: string;
  prediction: number;
};

export type predictedDrug = {
  formula: string;
  prediction: number;
};

export type invalidDrug = string;

export type filePredictResponse = {
  predictedDrugs: predictedDrug[];
  invalidDrugs: invalidDrug[];
};

const fetchSinglePredict = async (
  formula: string,
  isSaved: boolean = false
): Promise<number> => {
  try {
    const http = createHttpInstance();
    const { data } = await http.post<singlePredictionResponse>(
      "/prediction/single",
      { formula, savePrediction: isSaved }
    );
    return data.prediction;
  } catch (error) {
    throw error;
  }
};

const fetchFilePredict = async (
  form: FormData
): Promise<filePredictResponse> => {
  try {
    const http = createHttpInstance();
    const { data } = await http.post<filePredictResponse>(
      "/prediction/csv",
      form
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchSavedPredictions = async (): Promise<predictedDrug[]> => {
  try {
    const http = createHttpInstance();
    const { data } = await http.get<predictedDrug[]>("/prediction/saved");
    return data;
  } catch (error) {
    throw error;
  }
};

export { fetchSinglePredict, fetchFilePredict, fetchSavedPredictions };
