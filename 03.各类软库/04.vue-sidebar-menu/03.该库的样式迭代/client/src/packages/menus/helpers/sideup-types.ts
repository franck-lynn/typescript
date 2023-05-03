import { /* Component, PropType, */ HTMLAttributes } from "vue"
// ! 侧边栏, 水平左侧菜单数据结构, 重新定义一个互斥数据结构
/* 
  export interface IMenu {
    id?: string
    icon?: string
    title?: string
    href?: string
    isHidden?: boolean
    disabled?: boolean
    children?: IMenu[]

    header?: string
    clazz?: string
    attributes?: Partial<HTMLAttributes>

    // component?: Component
    // props?: PropType<IMenu>
  }
*/
interface MenuCommon {
  id?: string
  icon?: string
  isHidden?: boolean
  disabled?: boolean
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
