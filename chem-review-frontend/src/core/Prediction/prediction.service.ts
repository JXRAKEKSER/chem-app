import type { predictedDrug } from '@/api/prediction.api';
import type { IPredictionRepo } from './types';

class PredictionService {
    constructor (private readonly predictionRepo: IPredictionRepo) {}

    public computePrediction(formula: string, isSaved: boolean = false): Promise<number> {
        return this.predictionRepo.getSinglePrediction(formula, isSaved);
    }

    public computeFilePrediction(file: File) {
        return this.predictionRepo.getPredictionFromFile(file);
    }

    public getSavedPredictions(): Promise<predictedDrug[]> {
        return this.predictionRepo.getSavedPredictions();
    }
}

export default PredictionService;
