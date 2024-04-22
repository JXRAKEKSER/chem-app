import express from 'express';
import bodyParser from 'body-parser';

import configService from "./infrastructure/config.service";
import { ENV_VARIABLES } from './infrastructure/config.types';

import authGuard from './middlewares/auth-guard.middleware';
import errorMiddleware from './middlewares/error.middleware';
import { oneFieldParser } from './utils/useMulter';
import corsMiddleware from './middlewares/cors.middleware';

// роутеры
import authRouter from './routes/auth.routes';
import predictionRouter from './routes/prediction.routes';
import exportDataRouter from './routes/export-data.routes';

const app = express();

app.use(bodyParser.json());

app.use(corsMiddleware);

app.use('/auth', authRouter);
app.use('/prediction', authGuard, oneFieldParser('file'), predictionRouter);
app.use('/export', authGuard, exportDataRouter);

app.use(errorMiddleware);



const start = async () => {
  try {
    const PORT = Number(configService.get(ENV_VARIABLES.PORT));
    app.listen(PORT,() => {
        console.log(`server start on ${PORT}`);
    })
    console.log('connected');
  } catch (error) {
    console.log(error);
  }
};

start();
