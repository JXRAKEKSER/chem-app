import type { filePredictResponse, predictedDrug } from '@/api/prediction.api';

export interface IPredictionRepo {
    getSinglePrediction(formula: string, isSaved?: boolean): Promise<number>;
    getPredictionFromFile(file: File): Promise<filePredictResponse>;
    getSavedPredictions(): Promise<predictedDrug[]>;
}