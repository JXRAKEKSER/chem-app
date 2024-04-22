import { Router } from "express";

import { exportFromPredictedList } from "../controllers/export-data.controller";

const router = Router();

router.post("/prediction", exportFromPredictedList);

export default router;
