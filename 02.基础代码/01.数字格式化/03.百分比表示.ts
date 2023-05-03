console.log(
  new Intl.NumberFormat("zh-CN", {
    style: "unit",
    unit: "percent",
    // 设置 signDisplay: 'always'，则输出：+95% 或 -95%
    // signDisplay: 'always',
    // signDisplay: 'exceptZero',
  }).format(95)
)
