module.exports = {
  root: true, // root 表示 .eslintrc.js 配置文件的查找方式, root 表示到根路径就不再往上查找了
  env: {
    browser: true, // 表示浏览器环境的一些变量 window, document 不会报错
    node: true, // node 下的一些比哪里 process, global 不会报错
    es6: true,
  },
  // typescript 的 lint 参见下面这个网址, 配置这个后, import export 就不会报错了
  // https://typescript-eslint.io/docs/#step-2-configuration
  // parser: "@typescript-eslint/parser",
  parser: "vue-eslint-parser",
  extends: [
    "plugin:vue/vue3-recommended", // vue 的语法检查
    "eslint:recommended", // ES 的语法检查
    "@vue/typescript/recommended",
    // TS的语法检查
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    // https://typescript-eslint.io/docs/linting/typed-linting/
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    // "plugin:prettier/recommended",
    "prettier",
  ],

  parserOptions: {
    // __dirname 是 node 环境, 需要 env: {node: true}
    // tsconfigRootDir: __dirname, // 在全局中配置这个路径就是指项目的路径
    // 在 root 路径中, 要找到全局配置的 tsconfig.json, 还要加上 ../config/tsconfig.json
    // 项目的根路径翻过后就是 node 路径, node\config\tscongfig.json 有我设置的这个文件
    // 如果在项目根目录下有 tsconfig.json, 就用  project: ["./tsconfig.json"]
    // project: ["./tsconfig.json"],
    // 调整检查 vue 文件
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: false,
    },
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "vue/no-parsing-error": "off",
    "vue/multi-word-component-names": "off",
    "vue/comment-directive": "off",
    "vue/max-attributes-per-line": "off", // 属性另起一行检查
    "vue/html-indent": "off", // vue template 的空格检查
    "vue/singleline-html-element-content-newline": "off", // 取消{{内容}} 另起一行的检查
    "vue/component-definition-name-casing": "off", // 取消vue帕斯卡命名的检查
    "vue/html-self-closing": "off", // 取消 <div /> 封闭标签的检查
    "@typescript-eslint/no-explicit-any": "warn", // ts any 类型警告
    "@typescript-eslint/no-non-null-assertion": "off",
    "react/no-string-refs": "off",
    "react/no-unknown-property": "off",
    "react/display-name": "off",
    "vue/no-deprecated-functional-template": "off",
    "vue/one-component-per-file": "off",
    "vue/no-template-shadow": "off",
    "vue/require-prop-types": "off",
    "spaced-comment": ["error", "always", { exceptions: ["#__PURE__"] }],
    "node/no-callback-literal": "off",
    "import/namespace": "off",
    "import/default": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/ban-ts-comment": "off",
  },
}
