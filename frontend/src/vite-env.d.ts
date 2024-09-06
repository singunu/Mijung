/// <reference types="vite/client" />
// https://khj0426.tistory.com/238
// https://vitejs.dev/guide/env-and-mode

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}