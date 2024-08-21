import js from "@eslint/js";

export default [
  js.configs.recommended,

  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "no-eval": "warn",
      "no-redeclare": "warn",
      "no-unused-expressions": "warn",
      "no-implied-eval": "warn",
      "no-iterator": "warn",
      "no-label-var": "warn",
    },
  },
];
