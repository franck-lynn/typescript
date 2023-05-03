/**
 * Created by franck.lynn on 2021-12-09.
 * lry_demry@163.com
 * filename:  index.ts
 * 一些环境变量的处理
 */
// 获取环境配置中的变量

import "dotenv"

export const {
  HOST_NAME,
  PORT,
  SECRET,
  EMAIL, // 邮箱
  EMAIL_PASSWORD, // 邮箱密码
} = process.env

// 获取环境配置中的变量
// import.meta.env 是 vite 内置的环境变量, 默认是 development
// 只有 VITE_开头的 环境变量 能导出
// 这个导出的变量有什么作用呢? 是给 i18n/helpers/index.ts 用的, 用于
// 设置当前的语言环境变量的默认值
// @ts-ignore
export const LOCALE_LANG: string = import.meta.env.VITE_LOCAL_LANG // 默认的语言
// export const HOST_NAME = import.meta.env.BASE_URL
// 求出相对于 package.json 文件所在地址的方法
// console.log(path.relative(process.cwd(), "F:/working/study/alchemilla/.env"))
