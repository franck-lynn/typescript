import cp from 'child_process'

// F:\working\study\typescript\ts基础\NodeJS\子进程\exec python\call_python.js
// 执行 python 脚本
cp.exec('python ./ts基础/NodeJS/子进程/execPython/web.py', function(err, stdout) {
    if(err) console.log(err)
    console.log(stdout)
})
