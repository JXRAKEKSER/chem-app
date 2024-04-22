from predict_model.PredictModel import PredicModel
from typing_extensions import List, Union
from services.types import PredictedDrugs, InvalidDrugs

class PredictionService:
    def __init__(self, model: PredicModel) -> None:
        self._model = model
    
    def predict_from_smile(self, smiles: str) -> Union[float, None]:
        return self._model.predict(smiles)
    
    def predict_from_df(self, drugs: List[str]):
        predictedData: PredictedDrugs = { 'Drug': [], 'Prediction' : [] }
        incorrectDrugs: InvalidDrugs = { 'Drug' : [] }

        for drug in drugs:
            predictedValue = self._model.predict(drug)
            if predictedValue is None:
                incorrectDrugs['Drug'].append(drug)
            else:
                predictedData['Drug'].append(drug)
                predictedData['Prediction'].append(predictedValue)
        return ( predictedData, incorrectDrugs )