from pydantic_core import PydanticCustomError
from pydantic import BaseModel, field_validator
from rdkit import Chem

class SinglePredictDto(BaseModel):
    chemical_formula: str

    @field_validator('chemical_formula')
    @classmethod
    def validate_smiles(cls, v: str) -> str:
        mol = Chem.MolFromSmiles(v)
        print('value:', mol)
        if mol is None:
            raise PydanticCustomError('smiles', 'Невалидная строка smiles')
        return v



class SinglePredictResponse:
    def __init__(self, prediction) -> None:
        self.prediction = prediction
    