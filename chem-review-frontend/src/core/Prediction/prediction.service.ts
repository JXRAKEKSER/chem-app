import type { IPredictionRepo } from './types';

class PredictionService {
    constructor (private readonly predictionRepo: IPredictionRepo) {}

    public computePrediction(formula: string, isSaved: boolean = false): Promise<number> {
        return this.predictionRepo.getSinglePrediction(formula, isSaved);
    }

    public computeFilePrediction(file: File) {
        return this.predictionRepo.getPredictionFromFile(file);
    }
}

export default PredictionService;
