import { defineConfig } from 'dumi';
export default defineConfig({
  alias: {
    '@': require('path').resolve(__dirname, 'src'),
  },
  outputPath: 'dist',
  resolve: {
    codeBlockMode: 'passive',
  },
  themeConfig: {
    name: 'Rmobile',
  },
});
