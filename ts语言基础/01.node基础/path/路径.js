import path from 'path'

// "/" 表示的是磁盘根目录
// "." 表示的是当前目录.
// 只有 "/" 表示磁盘根目录
// ./ 表示以当前目录为根目录
// ../ 表示上级目录作为根目录
// 什么都没有表示 项目目录

console.log(
    path.resolve(__dirname, '../baz/')
)

console.log(path.resolve())
console.log(path.resolve(__dirname))



