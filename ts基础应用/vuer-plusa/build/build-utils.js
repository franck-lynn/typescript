// 构建 packages/utils 文件夹

import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
// import css from 'rollup-plugin-css-only'
// import vue from "rollup-plugin-vue"
import typescript from 'rollup-plugin-typescript2'

/* eslint-disable @typescript-eslint/no-var-requires */
const rollup = require('rollup')

// import { noPrefixFile } from './common'
// import pkg from '../package.json'
import pkg from 'F:/node/package.json'
import { BUNDLE_DIR, PROJECT_NAME, } from './constants'

// 返回 package.json 文件中的 dependencities 字段中的依赖项名称
const deps = pkg.dependencies ? Object.keys(pkg.dependencies) : undefined

const root = path.resolve(__dirname, '..') //  返回到项目的根目录

const file = process.argv[2]

// rollup 打包配置
const defaultOpts = {
    input: path.resolve(root, file), // 针对 process.argv 传入的路径, 都是可以找到的
    plugins: [
        // 都是些 ts 文件, 2个插件就好了
        nodeResolve({ extensions: ['.js', '.ts', '.tsx'] }),
        typescript({
            tsconfigDefaults: {
                'include': [
                    'src/**/*',
                    'typings/vue-shim.d.ts',
                ],
                'exclude': [
                    'node_modules',
                    'packages/**/__tests__/*',
                ],
            },
            abortOnError: false,
            tsconfig: path.resolve(__dirname, '../tsconfig.json'),
            tsconfigOverride: {
                // 覆盖掉项目目录下的 tsconfig.json 中的配置
                compilerOptions: { module: "ESNext" },
            },
            // 配上 cacheRoot 不会在 文件夹根目录下生成恼人的 undefined的文件夹了
            cacheRoot: path.resolve(__dirname, '../node_modules/rollup-plugin-typescript2 ')
        }),
    ],
    external: (id) => {
        return /^vue/.test(id) || // &&
            // new RegExp('^(?!(' + PROJECT_ENTRY_FOLDER + '))').test(id) ||
            //! 以 PROJECT_NAME 开头的项目排除掉, 注意, 这个并不是排除 vue-plus 入口项目
            //! 在 packages 中, vuer-plus 项目的 name 并不是 @vuer-plus/vuer-plus, 而是 vuer-plus, 
            //! 没有放在 @vuer-plus 里面
            new RegExp('^' + PROJECT_NAME + '/').test(id) ||
            (deps ? deps.some(k => new RegExp('^' + k).test(id)) : false)
    }
}


const noralizedName = file.slice(9) // 去掉 packages/ 名
// utils/types.ts
// 获取 utils/types.ts 前面部分, 去掉 ts. 再加上 js
// console.log("打印传过来的文件命令行参数---> ", noralizedName.split('.').shift())
// const outputJSFile = `${ noralizedName.split('.').shift()}.js`

const run = async (name) => {
    // 定义输出
    const esm = {
        format: 'es',
        file: `${BUNDLE_DIR}${path.sep}${name}`,
        exports: 'named'
    }
    const bundle = await rollup.rollup(defaultOpts)
    await bundle.write(esm)
    console.log(name, 'done 完成')
}
console.log(
    "工具组件打包: ", noralizedName
)
run(`${noralizedName.split('.').shift()}.js`)