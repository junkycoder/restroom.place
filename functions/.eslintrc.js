module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    "plugin:prettier/recommended"
  ],
  rules: {
    quotes: ["error", "double"],
  },
};
