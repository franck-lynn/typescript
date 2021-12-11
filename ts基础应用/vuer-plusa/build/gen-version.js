import fs from 'fs'
import path from 'path'

const tagVer = process.env.TAG_VERSION

let version
if (tagVer) {
    version = tagVer.startsWith('v') ? tagVer.slice(1) : tagVer
} else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    version = require('../package.json').version
}

// 获取版本号, 写入 vuer-plus 文件夹内
fs.writeFileSync(path.resolve(__dirname, '../packages/vuer-plus/version.ts'), 
    `export const version = '${version}'`
)