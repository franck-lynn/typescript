import {fork} from 'child_process'


// 执行 index.js 这个脚本, fork 执行 node 脚本
const msg = fork(`./ts基础/NodeJS/子进程/shellCommand/index.js`)

msg.on('message', msg => {
    console.log(msg)
})


