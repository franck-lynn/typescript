const formatter = new Intl.NumberFormat("zh-CN", {
  style: "unit",
  unit: "hour-per-week",
})
const res = formatter.format(40)
// 中文输出：40小时/周
// 英文输出：40 hr/w
console.log(res)
