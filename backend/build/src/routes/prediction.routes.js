"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prediction_controller_1 = require("../controllers/prediction.controller");
const router = (0, express_1.Router)();
router.post('/single', prediction_controller_1.getSinglePrediction);
router.post('/csv', prediction_controller_1.getFilePredict);
exports.default = router;
