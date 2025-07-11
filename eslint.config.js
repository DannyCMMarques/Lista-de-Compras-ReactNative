import { defineConfig } from 'eslint/config';
import expo from 'eslint-config-expo/flat.js';

export default defineConfig([
  ...expo,
  {
    rules: {
      'import/no-unresolved': ['error', { ignore: ['^@/'] }],
    },
  },
]);
