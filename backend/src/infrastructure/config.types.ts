enum ENV_VARIABLES {
  PORT = 'PORT',
  SALT = 'SALT',
  JWT_SECRET = 'JWT_SECRET',
  DATABASE_URL = 'DATABASE_URL',
  PREDICTION_SERVICE_URL = "PREDICTION_SERVICE_URL",
};

interface IConfigService {
  get(key: string): string;
}

export { IConfigService, ENV_VARIABLES };
