import cp from 'child_process'
// https://stackabuse.com/executing-shell-commands-with-node-js/
// exec 先执行 dir 这个命令
// exec 如何执行 powershell 命令? 
// https://www.cnblogs.com/chujunqiao/p/12571355.html
// cp.exec(`dir`, {encoding: 'utf8'}, (err, stdout, stderr) => {
//      if (err) {
//          console.error(`执行出错: ${err}`);
//          return;
//      }
//      console.log(`stdout: ${stdout}`);
//      console.log(`stderr: ${stderr}`);
// })


// Node 执行 powershell 命令 
// cp.exec('powershell -Command "Get-Help"', (err, stdout) => {
//     console.log(stdout)
// })

// const cmdStr = 'curl http://www.weather.com.cn/data/sk/101010100.html'
const cmdStr = `ls"`
cp.exec(cmdStr, /* { shell: true }, */ (err, stdout) => {
    if(err) console.log(err)
    console.log(stdout)
})


// node -r esm exec_shell.js











