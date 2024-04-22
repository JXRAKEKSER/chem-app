"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
class ConfigService {
    constructor() {
        const parseResult = (0, dotenv_1.config)();
        if (parseResult.error) {
            console.log('error while parse env');
        }
        else {
            this.config = parseResult.parsed;
        }
    }
    get(key) {
        return this.config[key];
    }
}
exports.default = new ConfigService();
