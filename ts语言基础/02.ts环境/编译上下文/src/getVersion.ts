// http://martsforever-snapshot.gitee.io/typescript-book-chinese/#why
// 了不起的 tsconfig.json 指南
// https://segmentfault.com/a/1190000022809326
// https://github.com/Nealyang/PersonalBlog/issues/72
// 返回当前版本号

// https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html#%E7%BC%96%E8%AF%91%E9%80%89%E9%A1%B9
const getVersion = (version: string = '1.0.0'):string => "版本号: " + version

console.log(
    getVersion('1.0.1')
)
// 执行 tsc 命令

