import { filePredictEntity } from "../api/predict.api";
import { IPredictRepo } from "../repository/types";

class PredictService {
  constructor(private readonly predictRepo: IPredictRepo) {}

  public async getSinglePredict(
    singlePredictDto: { userId: number; formula: string },
    isSaved: boolean = false
  ): Promise<number> {
    const prediction = await this.predictRepo.singlePredict(
      singlePredictDto.formula
    );
    if (isSaved) {
      await this.predictRepo.createPredict({ ...singlePredictDto, prediction });
    }
    return prediction;
  }

  public getFilePredict(file: Buffer): Promise<filePredictEntity> {
    return this.predictRepo.filePredict(file);
  }

  public getSavedPredictions(userId: number) {
    return this.predictRepo.getSavedPredictions(userId);
  }

}

export default PredictService;
