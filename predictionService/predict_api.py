from fastapi import FastAPI, File, Response
from io import StringIO
from typing_extensions import Annotated, List


from dto.single_predict_dto import SinglePredictDto, SinglePredictResponse
from dto.multy_predict_dto import MultyPredictResponse

from utils.PandasService import PandasUtils

from errors.ValidationError import ValidationError

from services.PredictionService import PredictionService
from predict_model.PredictModel import PredicModel

app = FastAPI()

def get_list_from_column(column_names: List[str], df):
    for column_name in column_names:
        has_target_column = column_name in df
        if has_target_column:
            return list(df[column_name])


@app.post('/prediction')
def predict(req: SinglePredictDto):
    model = PredicModel()
    predictionService = PredictionService(model=model)
    print(req.chemical_formula, 'req')
    prediction = predictionService.predict_from_smile(req.chemical_formula)
    if prediction is None:
        raise ValidationError(f'Неверная строка smiles: {req.chemical_formula}')
    
    return SinglePredictResponse(prediction=prediction)

@app.post('/prediction/csv')
def predictFromFile(file: Annotated[bytes, File()]):
    buffer_str = str(file, 'utf-8')
    drugs_df = PandasUtils.read_file(StringIO(buffer_str))
    drug_list = get_list_from_column(['drug', 'Drug'], drugs_df)

    if drug_list is None:
        raise ValidationError('Отсутствует колонка с именем Drug/drug')

    model = PredicModel()
    predictionService = PredictionService(model=model)
    predicted_dict, incorrect_dict = predictionService.predict_from_df(drugs=drug_list)

    response = MultyPredictResponse(predicted_dict, incorrect_dict)

    return response