import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

//elementplus按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),

    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      //配置elementPlus采用Sass样式配色系统
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),
    visualizer({
      open: true, // 打包完成后自动打开浏览器显示报告
      gzipSize: true, // 显示 gzip 压缩后的大小
      brotliSize: true, // 显示 brotli 压缩后的大小
      filename: 'stats.html', // 输出文件的名字，默认也是 stats.html
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: [
          'legacy-js-api',
          'color-functions',
          'global-builtin', // <--- 必须加这个！对应你截图里的警告
          'import', // <--- 强烈建议加这个，对应截图里提到的 "/d/import"
        ],
        //自动导入定制化样式文件进行样式覆盖
        additionalData: `
          @use "@/styles/element/index.scss" as *;
          @use "@/styles/var.scss" as *;
          `,
      },
    },
  },
  build: {
    sourcemap: true,
  },
})
