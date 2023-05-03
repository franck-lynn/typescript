// import { MaybeRef } from "@vueuse/core"
// ! 定义排除类型：将U从T中剔除, keyof 会取出T与U的所有键, 限定P的取值范围为T中的所有键, 并将其类型设为never
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
// ! 定义互斥类型，T或U只有一个能出现（互相剔除时，被剔除方必须存在） MutualExclusion
type MutualExclusion<T, U> = (Without<T, U> & U) | (Without<U, T> & T)

interface Link {
  // Link 类型里不允许有 header
  id?: string
  icon?: string
  isHidden?: boolean
  disabled?: boolean
  expanded?: boolean
  title?: string
  href?: string
  deep?: number
  children?: IMenu[]
}

interface Header {
  // id?: string
  deep?: number
  expanded?: boolean

  header?: string
  clazz?: string
}
export type IMenu = MutualExclusion<Link, Header>

// https://juejin.cn/post/7017682613959655461

/* 
export interface IMenu {
  id?: string
  icon?: string
  title?: string
  href?: string
  header?: string

  isHidden?: boolean
  disabled?: boolean
  expanded?: boolean
  children?: IMenu[]
}
*/
// ! 一种定义互斥类型的方法
/*
import { HTMLAttributes } from "vue"
// ! 侧边栏, 水平左侧菜单数据结构, 重新定义一个互斥数据结构
interface MenuCommon {
  id?: string
  icon?: string
  isHidden?: boolean
  disabled?: boolean
  expanded?: boolean
  children?: IMenu[]
}

interface Link {
  title?: string
  href?: string
}

interface Header {
  header?: string
  clazz?: string
  attributes?: Partial<HTMLAttributes>
}

// ! 定义排除类型：将U从T中剔除, keyof 会取出T与U的所有键, 限定P的取值范围为T中的所有键, 并将其类型设为never
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
// ! 定义互斥类型，T或U只有一个能出现（互相剔除时，被剔除方必须存在） MutualExclusion
type MutualExclusion<T, U> = (Without<T, U> & U) | (Without<U, T> & T)

export type IMenu = MenuCommon & MutualExclusion<Link, Header>
 */
