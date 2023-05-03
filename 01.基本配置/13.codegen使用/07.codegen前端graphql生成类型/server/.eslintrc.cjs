module.exports = {
  root: true, // root 表示 .eslintrc.js 配置文件的查找方式, root 表示到根路径就不再往上查找了
  env: {
    node: true, // node 下的一些比哪里 process, global 不会报错
    es6: true,
  },
  // typescript 的 lint 参见下面这个网址, 配置这个后, import export 就不会报错了
  // https://typescript-eslint.io/docs/#step-2-configuration
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended", // ES 的语法检查
    // TS的语法检查
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "no-var": "error",
    indent: ["error", 2, { SwitchCase: 1 }],
    "no-multi-spaces": "error",
    "space-in-parens": "error",
    "no-multiple-empty-lines": "error",
    "prefer-const": "error",
    "@typescript-eslint/no-explicit-any": "off",
  },
}
