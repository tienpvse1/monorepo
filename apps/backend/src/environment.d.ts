export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      KYSELY_LOGGING?: string;
      NEST_APP_PORT: string;
      NEST_APP_PREFIX: string;
      NEST_APP_VERSION: string;
      NEST_APP_JWT_SECRET: string;
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
