console.log(
  new Intl.NumberFormat(
    // 语言
    "en-US", // zh-CN
    {
      notation: "compact",
    }
  ).format(1400000000)
)
