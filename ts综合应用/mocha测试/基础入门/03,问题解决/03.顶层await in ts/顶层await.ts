

// node --harmony-top-level-await 顶层await.ts
// 在命令行中运行 node --loader ts-node/esm 顶层await.ts    
// 可以执行新的 await 特性

import fetch from 'node-fetch'
const response = await fetch('https://api.github.com/users/defunkt')

// const res = await  response.json() as Response
response.json().then((v: any) => console.log(v.login))