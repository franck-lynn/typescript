const pattern: RegExp = /L/g

//! exec() 对一个指定的字符串执行一个正则表达式
//! 就是一个字符串中执行匹配检索, 如果没找到匹配
//! 就返回 null, 如果找到, 就返回一个数组
// 加 g 与不加 重复执行时是不一样的
console.log(
    pattern.exec('LrL')
)
console.log(
    pattern.exec('LrL')
)



// test() 方法返回的是true 和, 与 exec() 执行
// 时行为是一致的
// 这里为什么是 false?
// 因为执行了2次 exec() 后, 指针指到了末尾, 所以没有
// 匹配了
console.log(pattern.test("Lr"))

// 这里为什么又是 true, 因为指向了末尾后又重新开始检测了
console.log(pattern.test("Lr"))



const regexp1 = new RegExp('L', 'g');



