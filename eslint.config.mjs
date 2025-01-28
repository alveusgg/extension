// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import prettiereslint from "eslint-config-prettier";

export default tseslint.config(
  {
    name: "eslint/recommended",
    ...eslint.configs.recommended,
  },
  ...tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  {
    name: "prettier/config",
    ...prettiereslint,
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
);
