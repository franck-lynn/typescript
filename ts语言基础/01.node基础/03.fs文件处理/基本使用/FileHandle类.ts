import {open} from 'fs/promises' 
// import fsPromises from 'fs/promises' 

const doRead = async() => {
    let fileHandle = null
    try{
        // 打开一个文件, 返回的是文件描述符的对象封装
        // fileHandle = await fsPromises.open('./hello.txt', 'r+')
        fileHandle = await open('./hello.txt', 'r+')
        // 对象是数字文件描述符的对象封装
        // 对象的实例通过 fsPromises.open() 方法创建
        console.log(fileHandle.fd)
        console.log(await fileHandle.stat())
    }catch(err){
        console.log(err)
    }finally{
        if(fileHandle){
            await fileHandle.close()
        }
    }
}

doRead()
