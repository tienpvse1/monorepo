/// <reference types="vite/client" />
interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_APP_TITLE: string;
  readonly VITE_BE_BASE_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_BE_DOMAIN: string;
  readonly VITE_FE_DOMAIN: string;
  // more env variables...
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
