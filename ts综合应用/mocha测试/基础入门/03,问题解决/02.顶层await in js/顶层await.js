// https://blog.csdn.net/xgangzai/article/details/114314178
// https://www.stefanjudis.com/today-i-learned/top-level-await-is-available-in-node-js-modules/
// 顶层 await 实现方法
// 不改文件名为 .mjs
// 在 package.json 文件中, 加入 "type": "module", 
// 并且, 在命令行执行 node 顶层await.js
// 在 .vscode 文件夹中, code-runner.executorMap 中 不加参数 -r esm 
// 也是可以执行的

import fetch from 'node-fetch'
const res = await fetch('https://api.github.com/users/defunkt')

// 打印的内容 defunkt
res.json().then(v => console.log(v))



