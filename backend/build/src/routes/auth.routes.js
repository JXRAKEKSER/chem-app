"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_guard_middleware_1 = __importDefault(require("../middlewares/auth-guard.middleware"));
const router = (0, express_1.Router)();
router.post('/register', auth_controller_1.registrate);
router.post('/login', auth_controller_1.login);
router.get('/me', auth_guard_middleware_1.default, auth_controller_1.getUserMe);
exports.default = router;
