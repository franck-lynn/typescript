// 字符串调用正则的方法 ssmr

//! 1. search()
// 找到就返回与之匹配的起始位置, 找不到就返回 -1
console.log(
    "Javascript".search(/script/i)
)

//! 2. repalce()
// 搜索并替换字符串
console.log(
    'javascript'.replace(/javascript/ig, 'JavaScript')
)

console.log(
    "Doe, John".replace(/(\w+)\s*, \s*(\w+)/, "$2 $1")
)

//! 3. match() , 返回匹配结果组成的数组
console.log(
    "1 plus 2 equals 3".match(/\d+/g)
)
//! 4. split()
console.log(
    "123,456,789".split(/d*,d*/)
)



