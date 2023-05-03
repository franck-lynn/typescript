console.log(
  new Intl.NumberFormat(
    // nu 要使用的编号系统
    // 可能的值有hanidec 表示中文十进制数字
    "zh-Hans-CN-u-nu-hanidec",
    {
      useGrouping: false, // 不使用分割符
    }
  ).format(8848.6)
)
