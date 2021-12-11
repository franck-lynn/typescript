// 只有 bincomp.js 调用
// 只是打包基本的组件项目
import path from 'path'
import { getPackages } from '@lerna/project'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import css from 'rollup-plugin-css-only'
import vue from "rollup-plugin-vue"
import typescript from 'rollup-plugin-typescript2'
// 支持字符串替换, 比如动态读取package.json的version到代码
// import replace from 'rollup-plugin-replace';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const rollup = require('rollup')

import { noPrefixFile } from './common'
import pkg from 'F:/node/package.json'

import { BUNDLE_DIR, PREFIX_FOLDER, PROJECT_NAME, } from './constants'

const deps = pkg.dependencies ? Object.keys(pkg.dependencies) : undefined

const runBuild = async () => {
    let index = 0
    const pkgs = await getPackages()
    // name: '@vuer-plus/button',
    const inputs = pkgs.map(pkg => pkg.name)
        // 如果含有项目名称的 package.json的name就挑选出来
        .filter(name => name.includes(PROJECT_NAME) &&
            // 如果不包含 utils 的子项目也挑选出来
            !name.includes('utils'))


    // 调用递归函数
    const build = async (name) => {
        // name 是获取每个子模块的名称
        if (!name) return
        // 直接打包, 并没有用到 node_modules
        const input = path.resolve(__dirname, '../packages/' + name.split(PROJECT_NAME + '/')[1] + '/index.ts')
        // console.log('input name ---> ', input)
        const inputOpts = {
            input,
            plugins: [
                // 解析扩展名的文件
                nodeResolve({ extensions: ['.js', '.ts', '.tsx'] }),
                css(),
                vue({
                    css: false,
                }),

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
                // replace({
                //     '@vuer-plus': '.'
                // })
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
            }
        }
        const getOutFile = () => {
            // 剥离出各子组件的名称, 例如: input, button, vuer-plus 等
            // console.log("获取 name=====", name)
            // i 获取 name===== @vuer-plus/button
            // i 获取 name===== @vuer-plus/input
            //? name 是从 package.json 里拿的
            //! vuer-plus 项目中的 package.json 的name 属性没有 @vuer-plus
            const compName = name.split(PROJECT_NAME + '/')[1]
            // 如果是 /(utils|directives|hooks|locale)/ 这些文件, 保持 文件名不变
            if (noPrefixFile.test(name)) {
                return `${BUNDLE_DIR}/${compName}/index.js`
            }
            // 否则, 就看 PREFIX_FOLDER 有没有, 有前缀就加上, 没有前缀就算了
            return PREFIX_FOLDER ? `${BUNDLE_DIR}/${PREFIX_FOLDER}${compName}/index.js` :
                `${BUNDLE_DIR}/${compName}/index.js`
        }

        const outOpts = {
            // file: 输出的文件名
            format: 'es',
            file: getOutFile(), // file 属性是打包后的文件名和路径
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
                        return id.replace(PROJECT_NAME, '..')
                    }
                    return id.replace(PROJECT_NAME + '/', PREFIX_FOLDER ? `../${PREFIX_FOLDER}` : '../')
                }
            }
        }

        const bundle = await rollup.rollup(inputOpts)

        await bundle.write(outOpts)
        console.log(name, 'done 完成')

        index++
        if (index < inputs.length) {
            await build(inputs[index])
        }
    }


    build(inputs[index])
}

runBuild()