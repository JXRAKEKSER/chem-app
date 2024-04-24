import { Router } from 'express';
import { getSinglePrediction, getFilePredict, getSavedPredictions } from '../controllers/prediction.controller';

const router = Router();

router.post('/single', getSinglePrediction);
router.get('/saved', getSavedPredictions);
router.post('/csv', getFilePredict);

export default router;
