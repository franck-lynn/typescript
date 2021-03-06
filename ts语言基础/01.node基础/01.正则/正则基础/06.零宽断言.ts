// https://www.bilibili.com/video/BV1oz4y1C7Uf?p=4
// 拿着这个令牌 /ab(?=[A-Z])/ 去字符串匹配
// 令牌要求 有ab并且后面跟着大写字母
console.log(
    'abcabCab'.match(/ab(?=[A-Z])/) 
)
// [ 'ab', index: 3, input: 'abcabCab', groups: undefined ]

// 否定断言, 找呀找, 好不容易找到第1个ab字符, 赶紧看下后面, 后面不是大写, 
// 好, 满足条件
// 再往后走, 找呀找, 有发现一个 ab字符, 发现后面是大写, 不要
// 再找呀找, 发现一个 ab 字符, 赶紧看下后面, 是个空, 不是大写, 满足条件
console.log(
    'abcabCab'.match(/ab(?![A-Z])/g) 
)
// [ 'ab', index: 0, input: 'abcabCab', groups: undefined ]

// 千分符
// \d(?=\d{3}$) 数字后面跟着3个数字结尾
// 拿 /\d(?=\d{3}$)/ 数字后面跟着3个数字结尾 这个规则找.
// 找到1 时, 发现后面不是3个数字结尾, 继续找2, 也不是, 继续找3, 发现是的, 是3个数字结尾, 就找到了 3 这个数字
console.log("数字后面跟着3个数字结尾, 找到3这个数字 --->  ", "123456".match(/\d(?=\d{3}$)/))
// /\d(?=\d{3}\d{3}$)/
console.log("数字后面跟着3个, 再3个以数字结尾, 找到4这个数字 --->  ", "1234567890".match(/\d(?=\d{3}\d{3}$)/g))
// /\d(?=\d{3}\d{3}\d{3}$)/
console.log("数字后面跟着3个, 再3个, 又再3个 以数字结尾, 找到1这个数字 --->  ", "1234567890".match(/\d(?=\d{3}\d{3}\d{3}$)/g))

// 可以考虑把 d{3} 分组 /\d(?=\d{3})/ ---> /\d(?=(\d{3})+$)/ 也就是说 一组以上的 \d{3} 就行
// /\d(?=(\d{3})+$)/g 拿这条规则 数字后面跟着 1个或多个3个数字并且以数组作为结尾
// 先找1, 1后面是 234 567 890 是以1个或多个3个数字结尾, 所以找到1, 
// 接着找2, 不是, 3, 不是, 4是的, 5不是, 6 不是, 7 是的, 所以找到的是 1, 4, 7
console.log("数字后面跟着3个, 再3个以数字结尾, 找到1这个数字 --->  ", "1234567890".match(/\d(?=(\d{3})+$)/g))
// 从现在的位置看这个数字, 后面有3个数字
// \d(?=(\d{3})+$)
console.log(
    "1234560.12".replace(/(\d)(?=(\d{3})+(\.|$))/g, '$1,')
)

// 密码强度
// 至少包含以为大写字母
// 从开头到结尾不能全由小写字母和数字组成
// ^ $  开头和结尾
// ^(?!$) 开头和结尾不能
// ^(?![0-9a-z]+$)开头和结尾不能全由小写字母和数组组成, 一定包含大学字母和特殊符号
// 至少包含一位数字
// 从开头到结尾不能全由字母组成
// 说明一定包含数字或者特殊符号
// ^ $ 开头和结尾
// ^(?!) $ 开头和结尾不能
// ^(?![A-Za-z]+$) 开头和结尾不能全由字母
// 不能有特殊符号, 排除特殊符号, 总共6位以上
// ^ $
// ^[0-9A-Za-z]{6,}$
// 总结 ^(?![0-9a-z]+$)(?![A-Za-z]+$)[0-9A-Za-z]{6,}$
console.log(
    "有大写, 小写, 数字可以匹配 -->", 
    /^(?![0-9a-z]+$)(?![A-Za-z]+$)[0-9A-Za-z]{6,}$/g.test("Password1"),
    ", 有大写, 小写, 没有数字不匹配 -->", 
    /^(?![0-9a-z]+$)(?![A-Za-z]+$)[0-9A-Za-z]{6,}$/g.test("Password"),
    ", 有大写, 小写, 有特殊字符不匹配 -->", 
    /^(?![0-9a-z]+$)(?![A-Za-z]+$)[0-9A-Za-z]{6,}$/g.test("Password*"),
)

