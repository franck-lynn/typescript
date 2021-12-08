// 分组 |
console.log(
    "xyzefedok".match(/ab|cd|ef/)
)
console.log(
    "java".match(/java(script)?/)
)

const m = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/.exec('2021-11-07')

const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/ 
const matchObj = RE_DATE.exec('1999-12-31') 
console.log(matchObj![1])
const year = matchObj!.groups!.year; // 1999
const month = matchObj!.groups!.month; // 12
const day = matchObj!.groups!.day; // 31
console.log(year, month, day)

// 负向先行断言
// https://www.bilibili.com/video/BV1oz4y1C7Uf?p=4
console.log(
    /Java(?! Script)([A-Z]\w*)/.test("JavaScript")
)
console.log(
    /Java(?! Script)([A-Z]\w*)/.test("JavaBeans")
)
console.log(
    /Java(?! Script)([A-Z]\w*)/.test("JavaScripter")
)
console.log(
    /Java(?! Script)([A-Z]\w*)/.test("Javanese")
)