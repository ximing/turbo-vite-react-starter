import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
// import { EsLinter, linterPlugin } from 'vite-plugin-linter';
import * as path from 'path';

export default defineConfig((configEnv) => ({
  plugins: [
    react({
      babel: {
        presets: [],
        // Your plugins run before any built-in transform (eg: Fast Refresh)
        plugins: [
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          [
            '@babel/plugin-proposal-class-properties',
            {
              loose: true
            }
          ],
          [
            '@babel/plugin-proposal-private-property-in-object',
            {
              loose: true
            }
          ],
          [
            '@babel/plugin-proposal-private-methods',
            {
              loose: true
            }
          ]
        ]
      }
    }),
    tsConfigPaths(),
    // linterPlugin({
    //   include: ['./src/**/*.{ts,tsx}'],
    //   linters: [new EsLinter({ configEnv })]
    // }),
    dts({
      include: ['src/index.ts'],
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace('/src', ''),
        content
      })
    })
  ],
  build: {
    lib: {
      entry: resolve('src', 'index.ts'),
      name: 'ReactFeatureFlag',
      fileName: (format) => `smart-table.${format}.js`
    },
    rollupOptions: {
      external: ['react']
    }
  },
  resolve: {
    alias: {
      '@/': path.resolve(__dirname, './src'),
      '@rabbitjs/smart-table': path.resolve(__dirname, './src/index.ts')
    }
  }
}));
