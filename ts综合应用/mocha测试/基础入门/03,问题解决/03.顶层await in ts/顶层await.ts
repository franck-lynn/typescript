

// node --harmony-top-level-await 顶层await.ts
import fetch from 'node-fetch'
const response = await fetch('https://api.github.com/users/defunkt')

// const res = await  response.json() as Response
response.json().then((v: any) => console.log(v.login))