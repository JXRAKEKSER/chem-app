import { Router } from 'express';
import { getSinglePrediction, getFilePredict } from '../controllers/prediction.controller';

const router = Router();

router.post('/single', getSinglePrediction);
router.post('/csv', getFilePredict);

export default router;
