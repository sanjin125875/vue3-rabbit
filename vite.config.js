import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// element 按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'vite-plugin-element-plus'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // ========== 新增：开发服务器配置 ==========
  server: {
    proxy: {
      '/api': {
        // 必须用 https:// —— 用 http:// 会被服务端 301 永久跳转到 https://，
        // 导致浏览器每次请求走两遍（301 + 跟进重定向），且 301 被 disk cache 长期保存
        target: 'https://pcapi-xiaotuxian-front-devtest.itheima.net',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  // ======================================
  css: {
      preprocessorOptions: {
        scss: {
          // 自动导入scss文件，免去手动导入的繁琐
          additionalData: `
            @use "@/styles/element/index.scss" as *;
            @use "@/styles/var.scss" as *;
          `,
        }
      }
  }
})