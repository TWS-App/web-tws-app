module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals", // bawaan Next.js
    "plugin:@typescript-eslint/recommended", // aturan dasar TypeScript
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
  },
};
