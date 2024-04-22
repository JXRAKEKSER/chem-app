from typing import Any, Dict, Union
from fastapi import HTTPException

class ValidationError(HTTPException):
    status_code = 400
    def __init__(self, detail: Any = None, headers: Union[Dict[str, Any], None] = None) -> None:
        super().__init__(self.status_code, detail, headers)