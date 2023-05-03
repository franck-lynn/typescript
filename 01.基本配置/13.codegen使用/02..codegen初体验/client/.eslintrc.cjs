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
    //  // TS的语法检查
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

// https://github.com/vueuse/vueuse/blob/main/.eslintrc.js

// module.exports = {
// root: true,
// env: {
//     browser: true,
//     node: true,
// },
// extends: [
//     // https://eslint.vuejs.org/rules/comment-directive.html
//     "plugin:vue/vue3-recommended",
//     "eslint:recommended",
//     "@vue/typescript/recommended",
//     // "plugin:mocha/recommended",
//     // "@vue/typescript/recommended",
//     // 对ts文件进行检查
//     "plugin:@typescript-eslint/eslint-recommended",
//     "plugin:@typescript-eslint/recommended",
//     // https://juejin.cn/post/6844903560270839815
//     // "plugin:prettier/recommended",
//     // "plugin:@typescript-eslint/recommended-requiring-type-checking" // https://www.npmjs.com/package/@typescript-eslint/eslint-plugin
// ],

// // https://eslint.vuejs.org/user-guide/#editor-integrations
// // 官网上的 What is the "Use the latest vue-eslint-parser" error?
// parser: "vue-eslint-parser", // Parsing error: '>' expected.eslint 错误的解决
// parserOptions: {
//     parser: "@typescript-eslint/parser",
//     ecmaVersion: 2021,
//     sourceType: "module",
// },

// //! 在html中检查 js代码见 .vscode setting.json中的设置
// //* https://stackoverflow.com/questions/54138689/how-can-i-get-eslint-to-lint-html-files-in-vscode
// //! 配置eslint验证下列文件,  .vscode setting.json中的设置
// //! "eslint.validate": ["javascript", "typescript", "vue", "html"], // 在 setting.json 中设置
// plugins: ["vue", "@typescript-eslint"],

// rules: {
//     // 当let定义变量时, 不会因为没有使用就用const
//     // "prefer-const": "off",
//     // 这里是一些自定义规则
//     // "@typescript-eslint/no-inferrable-types": "off",
//     // "@typescript-eslint/no-var-requires": "off",

//     "vue/no-parsing-error": "off",

//     "@typescript-eslint/no-unused-vars": [
//         "warn",
//         { vars: "all", args: "after-used", argsIgnorePattern: "^_", ignoreRestSiblings: true },
//     ],
//     "@typescript-eslint/no-didefind-vars": ["uni"],

//     "@typescript-eslint/camelcase": "off",
//     "vue/max-attributes-per-line": "off", // 属性另起一行检查
//     "vue/html-indent": "off", // vue template 的空格检查
//     "vue/singleline-html-element-content-newline": "off", // 取消{{内容}} 另起一行的检查
//     "vue/component-definition-name-casing": "off", // 取消vue帕斯卡命名的检查
//     "vue/html-self-closing": "off", // 取消 <div /> 封闭标签的检查

//     // "vue/valid-template-root": "off",
//     // "vue/no-multiple-template-root": "off",
//     // "vue/valid-v-model": "off"

//     // "strict": "error",
//     // "@typescript-eslint/no-use-before-define": "off",
//     // "@typescript-eslint/explicit-module-boundary-types": "off",
//     // "@typescript-eslint/no-explicit-any": "warn" // ts any 类型警告
//     "@typescript-eslint/no-explicit-any": "warn", // ts any 类型警告
//     // Forbidden non-null assertion.eslint@typescript-eslint/no-non-null-assertion
//     "@typescript-eslint/no-non-null-assertion": "off",
//     // "@typescript-eslint/no-non-null-assertion": "off",
//     "react/no-string-refs": "off",
//     "react/no-unknown-property": "off",
//     "react/display-name": "off",
//     "vue/no-deprecated-functional-template": "off",
//     "vue/one-component-per-file": "off",
//     "vue/no-template-shadow": "off",
//     "vue/require-prop-types": "off",
//     "spaced-comment": ["error", "always", { exceptions: ["#__PURE__"] }],
//     "no-restricted-imports": [
//         "error",
//         {
//             paths: restricted,
//         },
//     ],
//     "node/no-callback-literal": "off",
//     "import/namespace": "off",
//     "import/default": "off",
//     "import/no-named-as-default": "off",
//     "import/no-named-as-default-member": "off",
// },

// // vue3.2 发布, 有了新的语法糖, 这几个全局变量不要导入, 但是 eslint 会报错,
// // 所以, 先声明一下这几个全局变量, 不会出现不导入就使用的错误了
// globals: {
//     defineProps: "readonly",
//     defineEmits: "readonly",
//     defineExpose: "readonly",
// },
// }
