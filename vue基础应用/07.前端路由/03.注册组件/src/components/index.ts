// 注册组件
// 一次性注册组件
import type { App as Application } from 'vue'
// 读取 components 文件夹下的文件
const files  = import.meta.globEager('../components/**/*.vue')

// 安装这些组件

const install = (app: Application): void => {
    Object.keys(files).forEach((file: string) => {
        // 获取的是要导入的组件
        const component = files[file]?.default
        // 组件的名称 就是文件的名称, file 是文件的相对路径
        let filename: string
        // 如果是 index 或者 home 这些名称, 还要进行处理下, 
        // 让组件的名字等于上级文件夹的名字, 如果上级文件夹是 components 就不处理了
        if(file.match(/^(?!.*(index)|(home))/)){
            // 名称不包含 index或者home
            filename = file.replace(/(.*\/)*([^.]+).*/ig,"$2")
        }else{
            // TODO: 正则获取末级目录
            filename = ''
        }
        // console.log(file)
        // console.log(filename)
        app.component(filename, component)
    })
}

export default install