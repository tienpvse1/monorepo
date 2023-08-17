export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      KYSELY_LOGGING?: string;
    }
  }
}
