// https://stylelint.io/user-guide/rules/list/indentation/
module.exports = {
  extends: [
    "stylelint-config-standard",
    // https://github.com/prettier/stylelint-prettier
    // "stylelint-config-prettier",
    // "stylelint-config-html/vue",
    // "stylelint-config-recommended-vue",
  ],
  plugins: ["stylelint-order"],
  overrides: [
    // 扫描 .vue, html 文件中的 style 标签的样式
    {
      files: ["**/*.{vue, html}"],
      customSyntax: "postcss-html",
    },
  ],
  customSyntax: "postcss-html",
  ignoreFiles: ["**/*.js", "**/*.jsx", "**/*.tsx", "**/*.ts", "**/*.json"],
  rules: {
    indentation: 2,
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep", ":deep"],
      },
    ],
    // "selector-list-comma-newline-after": "never-multi-line", // 需要一个换行符或不允许空白选择逗号后的列表
    // "selector-list-comma-newline-before": "never-multi-line", // 逗号前需要一个换行符或不允许空白选择器列表
    "number-leading-zero": "always", //允许前导0
    "no-descending-specificity": null, // 不允许选择器之后覆盖选择器的低特异性更高的特异性, null 关闭
    "function-url-quotes": "always", // 要求或禁止对于网址引用
    "string-quotes": null, //指定字串，单或双引号
    "unit-case": null, // 指定大写或小写的单位
    "color-hex-case": "lower",
    "color-hex-length": "long",
    "rule-empty-line-before": "never",
    "font-family-no-missing-generic-family-keyword": null,
    "selector-type-no-unknown": null,
    "block-opening-brace-space-before": "always", // 开括号的块之前需要一个空格或不允许空白
    "block-opening-brace-space-after": "always-single-line",
    "at-rule-no-unknown": null,
    "no-duplicate-selectors": null,
    "property-no-unknown": null,
    "no-empty-source": null,
    "selector-class-pattern": null,
    "keyframes-name-pattern": null,
    "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global"] }],
    "function-no-unknown": null,
    "order/properties-order": [
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "z-index",
      "display",
      "justify-content",
      "align-items",
      "float",
      "clear",

      "margin",
      "margin-top",
      "margin-right",
      "margin-bottom",
      "margin-left",
      "padding",
      "padding-top",
      "padding-right",
      "padding-bottom",
      "padding-left",
      "width",
      "min-width",
      "max-width",
      "height",
      "min-height",
      "max-height",
      "font-size",
      "font-family",
      "font-weight",
      "border",
      "border-style",
      "border-width",
      "border-color",
      "border-top",
      "border-top-style",
      "border-top-width",
      "border-top-color",
      "border-right",
      "border-right-style",
      "border-right-width",
      "border-right-color",
      "border-bottom",
      "border-bottom-style",
      "border-bottom-width",
      "border-bottom-color",
      "border-left",
      "border-left-style",
      "border-left-width",
      "border-left-color",
      "border-radius",
      "text-align",
      "text-justify",
      "text-indent",
      "text-decoration",
      "overflow",
      "text-overflow",
      "white-space",
      "overflow-x",
      "overflow-y",
      "color",
      "background",
      "background-position",
      "background-repeat",
      "background-size",
      "background-color",
      "background-clip",

      "filter",
      "list-style",
      "outline",
      "visibility",
      "box-shadow",
      "text-shadow",
      "resize",
      "transform",
      "content",
      "opacity",
      "transition",
    ],
  },
}
