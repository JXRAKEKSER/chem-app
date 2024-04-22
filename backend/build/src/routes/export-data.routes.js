"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const export_data_controller_1 = require("../controllers/export-data.controller");
const router = (0, express_1.Router)();
router.post("/prediction", export_data_controller_1.exportFromPredictedList);
exports.default = router;
