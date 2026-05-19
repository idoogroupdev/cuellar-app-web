/// <reference types="vitest/config" />
// Plugins
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Fonts from 'unplugin-fonts/vite';
import Layouts from 'vite-plugin-vue-layouts-next';
import Vue from '@vitejs/plugin-vue';
import VueRouter from 'unplugin-vue-router/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// Utilities
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
import path from 'node:path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon

export default defineConfig({
  plugins: [VueRouter({
    dts: 'src/typed-router.d.ts'
  }), Layouts(), AutoImport({
    imports: ['vue', VueRouterAutoImports, {
      pinia: ['defineStore', 'storeToRefs']
    }],
    dts: 'src/auto-imports.d.ts',
    eslintrc: {
      enabled: true
    },
    vueTemplate: true
  }), Components({
    dts: 'src/components.d.ts'
  }), Vue({
    template: {
      transformAssetUrls
    }
  }),
  // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
  Vuetify({
    autoImport: true,
    styles: {
      configFile: 'src/styles/settings.scss'
    }
  }), Fonts({
    fontsource: {
      families: [{
        name: 'Roboto',
        weights: [100, 300, 400, 500, 700, 900],
        styles: ['normal', 'italic']
      }]
    }
  })],
  optimizeDeps: {
    exclude: ['vuetify', 'vue-router', 'unplugin-vue-router/runtime', 'unplugin-vue-router/data-loaders', 'unplugin-vue-router/data-loaders/basic']
  },
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url))
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue']
  },
  server: {
    port: 3000
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});