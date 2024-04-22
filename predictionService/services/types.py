from typing_extensions import List, TypedDict

class PredictedDrugs(TypedDict):
    Drug: List[str]
    Prediction: List[float]


class InvalidDrugs(TypedDict):
    Drug: List[str]