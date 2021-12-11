import path from 'path'
// https://www.jianshu.com/p/464e2bb58eda
//  作用:rollup 无法识别 node_modules 中的包，帮助 rollup 查找外部模块，然后导入
import { nodeResolve } from '@rollup/plugin-node-resolve'
//  将 CommonJS 模块转换为 ES6 供 rollup 处理
// import commonjs from "@rollup/plugin-commonjs"
// import { terser } from 'rollup-plugin-terser'
// import typescript from '@rollup/plugin-typescript'
import typescript from 'rollup-plugin-typescript2'
// import replace from '@rollup/plugin-replace'
// 可以转化箭头函数
import babel from "@rollup/plugin-babel"

import vue from "rollup-plugin-vue"


// 导入根 package.json 是为了要找到本项目要排除的依赖
import pkg from 'F:/node/package.json'

import { BUNDLE_DIR, PROJECT_ENTRY_FOLDER  } from './constants'
// 本大项目的依赖要排除掉
const deps = pkg.dependencies ? Object.keys(pkg.dependencies) : undefined

export default {
    //! 1. 构建项目的入口文件 是 ../package/vuer-plus/index.ts
    //!    因为入口文件, 还引入了子项目, 所以这些子项目单独打包
    input: path.resolve(__dirname, `../packages/${PROJECT_ENTRY_FOLDER}/index.ts`),
    // 构建项目的输出文件, 当前项目根目录下的 BUNDLE_DIR 文件夹
    // output: { format: 'es', file: 'dist/index.esm.js' },
    output: {
        format: 'es',
        file: `${BUNDLE_DIR}${path.sep}index.js`, // 输出的文件路径
        // sourcemap: true, // 生成映射文件, 把类型屏蔽掉
        // paths: (id) => {
        //    return "提供的路径会代替导入包的路径" + id
        // }
    },

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
            tsconfigOverride: {
                // 覆盖掉项目目录下的 tsconfig.json 中的配置
                compilerOptions: { module: "ESNext" },
            },
            tsconfig: path.resolve(__dirname, '../tsconfig.json'),
            // 配上 cacheRoot 不会在 文件夹根目录下生成恼人的 undefined的文件夹了
            cacheRoot: path.resolve(__dirname, '../node_modules/rollup-plugin-typescript2 ')
        }),
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

        babel({
            // 可以观察到. 在打包后的箭头函数已经转化了
            presets: ['@babel/preset-env'],
            babelHelpers: 'bundled'
        }),

        // commonjs(),
        // terser(), // 混淆压缩代码

    ],

    external(id) {
        return /^vue/.test(id) || // 把 导入的 import vue from 'vue' 的 vue 排除打包
            // 把导入的依赖项排除掉
            (deps ? deps.some(k => new RegExp('^' + k).test(id)) : false)
    },
}