console.log(
  new Intl.NumberFormat(
    // 语言
    "zh-CN",
    {
      // 金融
      style: "currency",
      // 输出人民币, 如果语言与币种不匹配, 会多出地区标记, 例如 US$
      currency: "CNY",
      // currencySign选项启用记帐格式
      currencySign: "accounting",
    }
  ).format(5000000)
)
