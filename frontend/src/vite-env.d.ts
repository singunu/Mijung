/// <reference types="vite/client" />
// https://khj0426.tistory.com/238
// https://vitejs.dev/guide/env-and-mode

interface ImportMetaEnv {
  readonly VITE_APP_DEV_URL: string;
  readonly VITE_APP_PRODUCT_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
