import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
// import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// 引入 typescript-eslint
import tseslint from 'typescript-eslint'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    // 修改：增加 ts 和 tsx 后缀
    files: ['**/*.{js,mjs,jsx,ts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),
  // === JS 推荐配置 ===
  js.configs.recommended,
  // === 新增：TS 推荐配置（结构数组）===
  ...tseslint.configs.recommended,
  // === Vue 推荐配置 ===
  ...pluginVue.configs['flat/essential'],
  // ...pluginOxlint.configs['flat/recommended'],
  skipFormatting,

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      // 新增：处理 Vue 文件中的 TS
      parserOptions: {
        // 告诉 eslint-plugin-vue：对于脚本部分，使用 TS 解析器
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    //不要求文件强制命名
    rule: {
      'vue/multi-word-component-names': 0,
      // 可选：如果 TS 的 any 报错太烦，可以在这里关掉
      // '@typescript-eslint/no-explicit-any': 'off',
    },
  },
])
