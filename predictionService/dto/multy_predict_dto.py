from services.types import PredictedDrugs, InvalidDrugs
from typing_extensions import Annotated


class MultyPredictResponse:
    def __init__(self, predicted_drugs: PredictedDrugs, invalid_drugs: InvalidDrugs) -> None:
        self._to_response(predicted_drugs)
        self.invalid_drugs = invalid_drugs['Drug']
    
    def _to_response(self, predicted_drugs: PredictedDrugs):
        self.predicted_drugs = {}
        for index, item in enumerate(predicted_drugs['Drug']):
            self.predicted_drugs.update({ f'{item}': predicted_drugs['Prediction'][index] })