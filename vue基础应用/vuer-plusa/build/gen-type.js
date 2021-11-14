import fs from 'fs'
import path from 'path'
import { BUNDLE_DIR, PREFIX_FOLDER, PROJECT_NAME, PROJECT_ENTRY_FOLDER } from './constants'
import { noPrefixFile } from './common'

// 声明文件中的类似 import Input from './src/input.vue';
// 打包后 ./src/ 目录下已经没有 input.vue 文件了
// const outsideImport = /import .* from '..\/(.*?)\/src\/.*/
const outsideImport = new RegExp('import .* from \'../(.*?)/src|\\' + PROJECT_NAME + '/.*')

// global.d.ts
fs.copyFileSync(
    // 把这个 vue-shim.d.ts 模式文件拷贝到构建目录 dist/vue-shim.d.ts 目录下
    path.resolve(__dirname, '../typings/vue-shim.d.ts'),
    path.resolve(__dirname, `../${BUNDLE_DIR}/vuer-plus.d.ts`),
)

// index.d.ts 这个文件是指 入口文件夹 vuer-plus 下的 index.d.ts
// 已经在打包时移动到了项目根目录下, 不再需要了
const newIndexPath = path.resolve(__dirname, `../${BUNDLE_DIR}/index.d.ts`)
// fs.copyFileSync(path.resolve(__dirname, `../${BUNDLE_DIR}/vuer-plus/index.d.ts`), newIndexPath)

const index = fs.readFileSync(newIndexPath)
const newIndex = index.toString().replace(
    // 如果声明文件中导入是  import VuerButton from '@vuer-plus/button';
    /@vuer-plus\//g,
    // 就需要把 @vuer-plus 替换成 ./button 这样的形式
    PREFIX_FOLDER ? `./${PREFIX_FOLDER}` : './'
    // 如果是 vuer-utils, 由于 util 没有加前缀, 所以前缀也把其替换掉
).replace('vuer-utils', 'utils')
fs.writeFileSync(newIndexPath, newIndex)

// remove ep 删除入口文件 vuer-plus 
fs.rmdirSync(path.resolve(__dirname, `../${BUNDLE_DIR}/${PROJECT_ENTRY_FOLDER}`), { recursive: true })

// remove test-utils 删除测试工具类文件
fs.rmdirSync(path.resolve(__dirname, `../${BUNDLE_DIR}/test-utils`), { recursive: true })


// component 组件中声明文件的替换
const libDirPath = path.resolve(__dirname, `../${BUNDLE_DIR}`)
fs.readdirSync(libDirPath).forEach(comp => {
    // console.log("读取dist目录下所有组件", comp) 
    //  不是这些文件夹: /(utils|directives|hooks|locale)/
    if (!noPrefixFile.test(comp)) {
        if (fs.lstatSync(path.resolve(libDirPath, comp)).isDirectory()) {
            // rename 更改导入包的路径
            const newCompName = PREFIX_FOLDER ? `${PREFIX_FOLDER}${comp}` : `${comp}`
            fs.renameSync(path.resolve(libDirPath, comp),
                path.resolve(libDirPath, newCompName))

            // re-import
            // 读取 各包下的声明文件
            const imp = fs.readFileSync(path.resolve(__dirname, `../${BUNDLE_DIR}`, newCompName, 'index.d.ts')).toString()
            if (outsideImport.test(imp) || imp.includes(`${PROJECT_NAME}/`)) {
                // const outsideImport = new RegExp('import .* from \'../(.*?)/src|\\' + PROJECT_NAME + '/.*')
                // console.log("imp---> ", imp)
                const newImp = imp
                    //TODO: 没有找到要匹配的内容, 可以不要, 先注释掉
                    // .replace(outsideImport, (i, c) => {
                    //     console.log("匹配到的--> " + i + "-----> " + i.replace(`${c}`, `../${PREFIX_FOLDER}${c}`))
                    //     return i.replace(`${c}`, `../${PREFIX_FOLDER}${c}`)
                    // })
                    .replace(
                        `${PROJECT_NAME}/`,
                        `../${PREFIX_FOLDER}`)
                    .replace(
                        `${PREFIX_FOLDER}utils`, 'utils')
                // console.log(newImp)
                fs.writeFileSync(path.resolve(__dirname, `../${BUNDLE_DIR}`, newCompName, 'index.d.ts'), newImp)
            }

        }
    }
})

// after components dir renamed
// 读取 dist 目录下所有的文件
fs.readdirSync(libDirPath).forEach(comp => {
    // check src/*.d.ts exist 获取 dist/button/src 等这些目录
    const srcPath = path.resolve(libDirPath, comp, './src')

    if (fs.existsSync(srcPath)) {
        // 如果是有效目录, 如果是目录
        if (fs.lstatSync(srcPath).isDirectory()) {
            // 读取目录下的文件, 一般是 button.vue.d.ts
            fs.readdir(srcPath, 'utf-8', (err, data) => {
                if (err) return
                // data 是 文件名数组 ['button.vue.d.ts'], ['input.vue.d.ts']
                // replace all @element-plus in src/*.d.ts
                // 对每个数组进行处理
                data.forEach(f => {
                    // 如果不是路径
                    if (!fs.lstatSync(path.resolve(srcPath, f)).isDirectory()) {
                        // 读取文件内容
                        const imp = fs.readFileSync(path.resolve(srcPath, f)).toString()
                        // 如果包含 @element-plus/
                        if (imp.includes(`${PROJECT_NAME}/`)) {
                            // .vue 文件可能也有导入了本地项目的声明文件, 
                            // 也存在 @vuer-plus 这些字符, 需要做替换
                            const newImp = imp.replace(new RegExp(
                                    `${PROJECT_NAME}/`, 'g'),
                                PREFIX_FOLDER ? `../../${PREFIX_FOLDER}` : `../../`)
                            fs.writeFileSync(path.resolve(srcPath, f), newImp)
                        }
                    }
                })
            })
        }
    }
})