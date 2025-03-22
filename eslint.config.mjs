import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";


export default defineConfig([
  globalIgnores(['coverage/**/*', 'dist/**/*']),
  { files: ["src/**/*.{js,mjs,cjs,jsx}"] },
  { files: ["src/**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.browser } },
  { files: ["src/**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"] },
  {
    files: ['src/**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {  
        version: 'detect'
      }
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      'react/prop-types': 0,
    }
  },
  reactHooks.configs['recommended-latest']
]);