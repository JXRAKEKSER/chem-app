from typing import Union

from fastapi import FastAPI

from predict_api import app as predict_api

app = FastAPI()

@app.get('/hello')
def hello():
    return {'Hello'}

app.mount('/prediction', predict_api)