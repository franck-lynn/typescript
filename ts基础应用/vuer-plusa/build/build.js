// 每次都只是构建一个子项目, 一个一个地构建, 整个的也就构建好了
import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import css from 'rollup-plugin-css-only'
import vue from "rollup-plugin-vue"
import typescript from 'rollup-plugin-typescript2'

/* eslint-disable @typescript-eslint/no-var-requires */
const rollup = require('rollup')

import { noPrefixFile } from './common'
import pkg from 'F:/node/package.json'
import { BUNDLE_DIR, PREFIX_FOLDER, PROJECT_NAME, } from './constants'
// BUNDLE_DIR, PREFIX_FOLDER, PROJECT_NAME, PROJECT_ENTRY_FOLDER
// 返回 package.json 文件中的 dependencities 字段中的依赖项名称
const deps = pkg.dependencies ? Object.keys(pkg.dependencies) : undefined

// const root = path.resolve(__dirname, '..') //  返回到项目的根目录

// import chalk from 'chalk'
// import ora from 'ora' // 转轮
// const spinner = ora(`${chalk.blue('Building...')}`).start()


// rollup 打包配置
const defaultOpts = {
    plugins: [
        // 解析扩展名的文件
        nodeResolve({ extensions: ['.js', '.ts', '.tsx'] }),
        // nodeResolve(),

        // typescript({
        //     include: ['packages/**/*', 'typings/vue-shim.d.ts', ],
        //     exclude: ['node_modules', 'packages/**/__tests__/*', ],
        //     abortOnError: false,
        //     tsconfig: path.resolve(__dirname, '../tsconfig.json')
        // }),
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
        css(),
        vue({
            css: false,
            // target: 'browser',
            // compileTemplate: true
        }),
        // replace({
        //     preventAssignment: true,
        //     'process.env.NODE_ENV': JSON.stringify('development'),
        //     // vue3.0 rc-3 以后, 推荐显式注明构建模式, 这里是开发时的配置, 生成模式重新配置
        //     "__VUE_OPTIONS_API__": false,
        //     "__VUE_PROD_DEVTOOLS__": true,
        //     // 显式指定 i18n 构建配置
        //     "__VUE_I18N_FULL_INSTALL__": true,
        //     "__VUE_I18N_LEGACY_API__": true,
        //     "__INTLIFY_PROD_DEVTOOLS__": false
        // }),

        // babel({
        //     // 可以观察到. 在打包后的箭头函数已经转化了
        //     presets: ['@babel/preset-env'],
        //     babelHelpers: 'bundled'
        // }),

        // commonjs(),
        // terser(), // 混淆压缩代码
    ],
    external: (id) => {
        //! 导入的 vue 包得排除掉, 会把 vuer-plus 这个包一起排除掉了 
        return /^vue/.test(id) || // &&
            // 因为这个项目各些子项目要分别打包, 由于存在一些相互得引用.
            // 得把这些影响的本地子项目也排除在打包之外, 只打各自的项目
            // 以 PROJECT_NAME = @vuer-plus 开头的是本地子项目, 排除打包
            new RegExp('^' + PROJECT_NAME + '/').test(id) ||
            // 引入的第3方, 当然要排除
            (deps ? deps.some(k => new RegExp('^' + k).test(id)) : false)


        // return /^vue/.test(id) && // 以 vue 开头的项目排除掉
        //     new RegExp('^(?!(' + PROJECT_ENTRY_FOLDER + '))').test(id) ||
        //     //! 以 PROJECT_NAME 开头的项目排除掉, 注意, 这个并不是排除 vue-plus 入口项目
        //     //! 在 packages 中, vuer-plus 项目的 name 并不是 @vuer-plus/vuer-plus, 而是 vuer-plus, 
        //     //! 没有放在 @vuer-plus 里面, 但是被上面的  /^vue/ 开头排除掉了
        //     new RegExp('^' + PROJECT_NAME + '/').test(id) || //
        //     // 依赖项数组中, 以依赖库名称开头的, 是不是和传入的 id 一样, 如果一样, 就排除掉
        //     (deps ? deps.some(k => new RegExp('^' + k).test(id)) : false) //
    }
}


// 如果是 @vuer-plus 开头的 就是组件包
// const isPkg = id => id.startsWith(PROJECT_NAME)
// const isExcluded = id => noPrefixFile.test(id)
// const replacePrefix = (prefix, target) => prefix + target.slice(PROJECT_NAME.length)



const run = async (name, isRoot = false) => {
    console.log(
        isRoot ? "入口文件打包" : "基本组件打包: ", name
    )

    // build.comps.js 调用了这个函数, 是通过 scripts/build.sh.js 调用的
    //! name 是构建后输出的路径, input 是源文件路径
    // console.log("name参数---> ", name, '---', name.split(PROJECT_NAME + path.sep)[1], )
    // v-button/index.js ---- packages/button
    // input = './packages/element-plus'
    // 项目根目录到 ./packages/element-plug/index.ts 文件
    // const inputPath = `${path.resolve(root, input)}${path.sep}index.ts`
    const input = path.resolve(__dirname, '../packages/' + name.split(PROJECT_NAME + path.sep)[1] + '/index.ts')
    // console.log("源路径 ok --> ", input)
    // 把这个路径放入 defaultOpts.input 属性
    defaultOpts.input = input
    // 组件 id 通过getPaths 函数处理
    // 输出的路径是输出到 dist里 组件对应路径下

    const getOutFile = () => {
        // 剥离出各子组件的名称, 例如: input, button, vuer-plus 等
        // console.log("获取 name=====", name)
        // i 获取 name===== @vuer-plus/button
        // i 获取 name===== @vuer-plus/input
        //? name 是从 package.json 里拿的
        //! vuer-plus 项目中的 package.json 的name 属性没有 @vuer-plus
        const compName = name.split(PROJECT_NAME + path.sep)[1]
        // 如果是 /(utils|directives|hooks|locale)/ 这些文件, 保持 文件名不变
        if (noPrefixFile.test(name)) {
            // 如果是入口文件, 直接放在 根目录下
            return isRoot ? `${BUNDLE_DIR}/index.js` : `${BUNDLE_DIR}/${compName}/index.js`
        }
        // 否则, 就看 PREFIX_FOLDER 有没有, 有前缀就加上, 没有前缀就算了
        return isRoot ? `${BUNDLE_DIR}/index.js` : `${BUNDLE_DIR}/${compName}/index.js`
        //! 如果有前缀,  组件名称前面也会先带上, 所以这里不用再加了, 否则就重复了
        // (PREFIX_FOLDER ? `${BUNDLE_DIR}/${PREFIX_FOLDER}${compName}/index.js` :
        //     `${BUNDLE_DIR}/${compName}/index.js`)
    }

    const esm = {
        format: 'es',
        // file: 输出的文件名
        file: getOutFile(),
        // file: `${BUNDLE_DIR}${path.sep}${name}`,
        paths: (id) => {
            // console.log("工程的目录----> ", PROJECT_NAME)
            // console.log("import 进来的名称----> ", id)
            // paths 是 import 进来的时候的路径修改, 例如: 在 button 引入了 input, 
            // 原来是 @vuer-plus/input/index.ts, 打包后, 这个 路径就不存在了, 
            // 所以要修改成 打包后的路径
            // vuer-plus 入口项目和 /(utils|directives|hooks|locale)/ 项目都排除掉了
            if (new RegExp('^' + PROJECT_NAME + '/').test(id)) {
                // 如果 import 是 PROJECT_NAME = @vuer-plus 的路径, 
                if (noPrefixFile.test(id)) {
                    // 再判断是不是包含 noPrefixFile = /(utils|directives|hooks|locale)/ 这几个词语的路径
                    // 因为这几个词语的路径打包后还是原来的名称, 所以 PROJECT_NAME = @vuer-plus 替换成
                    // .. 就好
                    return id.replace(PROJECT_NAME, '.')
                }
                return id.replace(PROJECT_NAME + '/', PREFIX_FOLDER ? `./${PREFIX_FOLDER}` : './')
            }
        }
    }

    const bundle = await rollup.rollup(defaultOpts)
    await bundle.write(esm)
    console.log(name, 'done 完成')
    // await Promise.all([bundle.write(esm), bundle.write(cjs)])
}

export { run }