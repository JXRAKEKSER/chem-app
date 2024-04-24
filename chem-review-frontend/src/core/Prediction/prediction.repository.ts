import type { IPredictionRepo } from './types';
import type { filePredictResponse, predictedDrug } from '@/api/prediction.api';
import { fetchSinglePredict, fetchFilePredict, fetchSavedPredictions } from '@/api/prediction.api';

class PredictionRepo implements IPredictionRepo {
    public getSinglePrediction(formula: string, isSaved: boolean = false): Promise<number> {
        return fetchSinglePredict(formula, isSaved);
    }

    public getPredictionFromFile(file: File): Promise<filePredictResponse> {
        const form = new FormData();
        form.append('file', file);
        return fetchFilePredict(form);
    }

    public getSavedPredictions(): Promise<predictedDrug[]> {
        return fetchSavedPredictions();
    }
}

export default PredictionRepo;
