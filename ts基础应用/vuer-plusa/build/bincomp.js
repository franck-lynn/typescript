// 处理项目下的 所有 package.json 文件
// 在根目录下运行 node -r esm ./build/boncomp.js
// 使用了 build.component.js 文件
// 只是打包基本的组件项目
import cp from 'child_process'
import path from 'path'
import { getPackagesSync } from '@lerna/project'
import ora from 'ora' // 转轮
import chalk from 'chalk'

import { PROJECT_NAME } from './constants'

const spinner = ora(`${chalk.blue('Building...')}`).start()

// 同步获取 package.json 文件, 
// 得到 [ '@vuer-plus/button', '@vuer-plus/vuer-plus' ]
const pkgs = getPackagesSync()
    // 获取 package.json 的name 属性
    .map(pkg => pkg.name)
    .filter(name => {
        // 如果含有项目名称的 package.json的name就挑选出来
        return name.includes(PROJECT_NAME) &&
            // 如果不包含 transition 和 utils 的子项目也挑选出来
            !name.includes('transition') && !name.includes('utils')
    })
// pkgs = ['@vuer-plus/button', '@vuer-plus/vuer-plus']

const STEP = 4 // 4核机器
const START = 0

const buildChild = (start, end) => {
    let s = start
    let e = end
    // TODO: 子进程
    const c1 = cp.spawn('node', ['-r', 'esm', `${path.resolve(__dirname, './build.component.js')}`, s, e])
    //  
    c1.stdout.on('data', data => spinner.info(`${chalk.blue(data)}`))
    c1.stderr.on('data', data => spinner.warn(`${chalk.red(data)}`))
    c1.on('close', code => {
        s += STEP
        e += STEP
        if (s > pkgs.length) {
            spinner.succeed(`${chalk.green('Build done. Exit code ' + code)}`)
            return
        }
        buildChild(s, e)
    })
}


/**
 * @link https://github.com/ezolenko/rollup-plugin-typescript2/issues/177
 */
buildChild(START, STEP)