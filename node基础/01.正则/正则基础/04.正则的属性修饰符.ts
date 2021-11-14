
// 属性 lastIndex source
// 正则 6 个修饰符 gimyus
// g → global 全局
// i → ignoreCase 大小写是否敏感
// m → multiline 多行匹配, 不加表示只匹配一行
// y → sticky
// u → unicode
// s → dotAll
console.log(
    "abcgaab\nabcoab".match(/^abc/g)
)
console.log(
    "abcgaab\nabcoab".match(/^abc/gm)
)
