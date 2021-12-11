

// 常量

const BUNDLE_DIR = "dist" // 打包后生成的文件夹名称
//! 这个  PREFIX_FOLDER 名称应该和组件 package.json 的 name 属性保持一致
//! 因为 lerna 生成的文件夹是以这个名称开头的
const PREFIX_FOLDER = 'vuer-' // 在打包生成的文件夹里的子包文件夹名称前加上前缀
// const PREFIX_FOLDER = '' // 在打包生成的文件夹里的子包文件夹名称前加上前缀
// 实例中: PROJECT_NAME = @vuer-plus
// const PROJECT_NAME = `@${PREFIX_FOLDER}plus`
const PROJECT_NAME = `@vuer-plus`
// 实例中: PROJECT_ENTRY_FOLDER = vuer-plus
const PROJECT_ENTRY_FOLDER = PROJECT_NAME.split('@')[1]

export  { BUNDLE_DIR, PREFIX_FOLDER, PROJECT_NAME, PROJECT_ENTRY_FOLDER }
// module.exports = PREFIX_FOLDER