import { IConfigService, ENV_VARIABLES } from "./config.types";
import { DotenvConfigOutput, DotenvParseOutput, config } from 'dotenv';
class ConfigService implements IConfigService {
    private config: DotenvParseOutput;
    private envPath = process.argv[2] === 'dev' ? ".env.development" : ".env"
    constructor() {
        const parseResult: DotenvConfigOutput = config({ path: this.envPath });
        console.log(this.envPath);
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
