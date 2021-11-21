// https://blog.csdn.net/xgangzai/article/details/114314178
// 顶层 await 实现方法
// 改文件名为 .mjs
// 并且在命令行执行 node 顶层await.mjs

import fetch from 'node-fetch'
const res = await fetch('https://api.github.com/users/defunkt')

// 打印的内容 defunkt
res.json().then(v => console.log(v.login))



