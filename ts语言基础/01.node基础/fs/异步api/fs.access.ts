// 测试用户对 path 知道的文件货目录的权限

import fs from 'fs'


const file = './hello.txt'
// 判断文件是否存在
// 指示文件对调用进程可见的标志。 这对于确定文件是否存在很有用，但没有说明 rwx 权限。 未指定模式时的默认值
fs.access(file, fs.constants.F_OK, (err) => {
    console.log(`${file} ${err ? 'does not exist' : 'exists'}`)
})
// 判读文件是否可读
fs.access(file, fs.constants.R_OK, (err) => {
    console.log(`${file}, ${err ? '不可读': '可读'}`)
})
// 判断文件是否可写
fs.access(file, fs.constants.W_OK, (err) => {
    console.log(`${file}, ${err ? '不可写': '可写'}`)
})
// 检查当前目录是否存在文件, 是否可写
fs.access(file, fs.constants.F_OK | fs.constants.W_OK, (err) => {
    if(err){
        console.error(`${file} ${err.code === 'ENOENT' ? '不存在' : '仅可读'}`)
    }else{
        console.log(`${file} 存在并且可写`)
    }
})
