"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_service_1 = __importDefault(require("./infrastructure/config.service"));
const config_types_1 = require("./infrastructure/config.types");
const auth_guard_middleware_1 = __importDefault(require("./middlewares/auth-guard.middleware"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const useMulter_1 = require("./utils/useMulter");
const cors_middleware_1 = __importDefault(require("./middlewares/cors.middleware"));
// роутеры
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const prediction_routes_1 = __importDefault(require("./routes/prediction.routes"));
const export_data_routes_1 = __importDefault(require("./routes/export-data.routes"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(cors_middleware_1.default);
app.use('/auth', auth_routes_1.default);
app.use('/prediction', auth_guard_middleware_1.default, (0, useMulter_1.oneFieldParser)('file'), prediction_routes_1.default);
app.use('/export', auth_guard_middleware_1.default, export_data_routes_1.default);
app.use(error_middleware_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const PORT = Number(config_service_1.default.get(config_types_1.ENV_VARIABLES.PORT));
        app.listen(PORT, () => {
            console.log(`server start on ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
start();
