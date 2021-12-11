import path from 'path'
import { run } from './build'
// 构建入口文件, 这个文件并没有在 package.json 中调用, 
import { PROJECT_NAME, PROJECT_ENTRY_FOLDER } from './constants'
// 而是在 scripts 脚本中调用的.
// 入口文件还有自动导入 子组件, 所以通过 shell 脚本来处理
run(`${PROJECT_NAME}${path.sep}${PROJECT_ENTRY_FOLDER}`, true)