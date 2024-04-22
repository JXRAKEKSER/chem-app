import { IConfigService, ENV_VARIABLES } from "./config.types";
import { DotenvConfigOutput, DotenvParseOutput, config } from 'dotenv';

class ConfigService implements IConfigService {
    private config: DotenvParseOutput;

    constructor() {
        const parseResult: DotenvConfigOutput = config();
        if (parseResult.error) {
            console.log('error while parse env');
        } else {
            this.config = parseResult.parsed as DotenvParseOutput;
        }
    }

    get(key: ENV_VARIABLES): string {
        return this.config[key];
    }
}

export default new ConfigService();
