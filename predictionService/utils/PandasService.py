from pandas import read_csv, DataFrame
from errors.ValidationError import ValidationError
from typing_extensions import Dict, List, TypeVar
from io import StringIO

T = TypeVar('T', float, str)

class PandasUtils:
    @staticmethod
    def read_file(buffer: StringIO):
        try:
            df = read_csv(buffer)
            if 'Drug' not in df.columns and 'drug' not in df.columns:
                raise Exception('Отсутствет колонка с именем Drug/drug')
            return df
        except Exception as error:
            raise ValidationError(detail=f'{error}')
    
    @staticmethod
    def dict_to_excel(dict: Dict[str, List[T]]):
        df = DataFrame(dict)
        return bytes(df.to_csv(index=False), encoding='utf-8')