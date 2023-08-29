export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      KYSELY_LOGGING?: string;
      NEST_APP_PORT: string;
      NEST_APP_PREFIX: string;
      NEST_APP_VERSION: string;
      NEST_APP_JWT_SECRET: string;
      NEST_APP_DATABASE_HOST: string;
      NEST_APP_DATABASE_PORT: string;
      NEST_APP_DATABASE_USER: string;
      NEST_APP_DATABASE_PASS: string;
      NEST_APP_DATABASE_DB: string;
    }
  }

  namespace Express {
    interface User {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
    }
  }
}
