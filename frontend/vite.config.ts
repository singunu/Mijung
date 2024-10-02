import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: '미정 (味定)', // 설치 배너에 표시되는 이름
        short_name: '미정', // 아이콘 아래에 표시될 이름
        description: '미정 (味定)은 자취생들을 위한 레시피 추천 서비스입니다.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        lang: 'ko',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icons/logo.svg',
            sizes: '150x150',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
          {
            src: '/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  server: {
    host: true, // dev에서 외부접근 허용. 퍼블릭 IP에서 접속 가능하도록 설정
    port: 5173,
  },
  preview: {
    host: true, // preview에서 외부접근 허용. 퍼블릭 IP에서 접속 가능하도록 설정
    port: 4173,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, './index.html'),
      },
    },
  },
});
