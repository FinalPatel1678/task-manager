module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  settings: {
    react: {
      version: "18.3.3",
    },
  },
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: [
    "react",
    "@typescript-eslint",
    "eslint-plugin-import",
    "react-hooks",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
    project: ["tsconfig.eslint.json"],
  },
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "import/prefer-default-export": "off",
    "import/no-default-export": "warn",
    "import/extensions": [
      "error",
      {
        ts: "never",
        tsx: "never",
      },
    ],
    "linebreak-style": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        trailingComma: "es5",
        printWidth: 120,
        tabWidth: 2,
        semi: true,
        singleQuote: false,
        jsxSingleQuote: false,
        jsxBracketSameLine: false,
        arrowParens: "always",
        parser: "typescript",
      },
      {
        usePrettierrc: false,
      },
    ],
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "react/prop-types": "off",
    "react/destructuring-assignment": "warn",
    "react/no-array-index-key": "error",
    "react-hooks/rules-of-hooks": "error", 
    "react-hooks/exhaustive-deps": "warn", 
  },
};