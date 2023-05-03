
// 找到左侧的单词边界
console.log(
    /\bhello/.exec("  hello world")
)

// 找到右侧单词以world为边界的字符串
console.log(
    /world\b/.exec("  hello world")
)

// 前后都是单词world作为边界的只有 world
console.log(
    /\bworld\b/.exec("  hello world")
)
// 前后都是单词作为边界的只有 hello, 因为
// hello 后面有空格
console.log(
    /\b\w+\b/.exec("  hello world ")
)

