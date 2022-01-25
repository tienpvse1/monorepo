export const appConfig = () => ({
  app: {
    port: process.env.APP_PORT || '8080',
    prefix: process.env.APP_PREFIX || 'api/v1',
    secretToken: process.env.APP_SECRET_TOKEN || 'secretToken',
    dbHost: process.env.MYSQL_HOST || 'localhost',
    version: process.env.APP_VERSION || 'localhost',
  },
  database: {
    password: process.env.MYSQL_ROOT_PASSWORD || '123456',
    name: process.env.MYSQL_DATABASE || 'crm',
    port: process.env.MYSQL_PORT || '3306',
  },
  google: {
    id: process.env.GOOGLE_CLIENT_ID || '',
    secret: process.env.GOOGLE_SECRET_KEY || '',
    redirectURL: process.env.GOOGLE_SUCCESS_REDIRECT || '',
    frontendUrl: process.env.FE_REDIRECT_URL || '',
    googleUsername: process.env.GOOGLE_USERNAME || '',
    googlePassword: process.env.GOOGLE_PASSWORD || '',
  },
});
