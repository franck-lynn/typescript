// import { MaybeRef } from "@vueuse/core"
// ! 定义排除类型：将U从T中剔除, keyof 会取出T与U的所有键, 限定P的取值范围为T中的所有键, 并将其类型设为never
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
// ! 定义互斥类型，T或U只有一个能出现（互相剔除时，被剔除方必须存在） MutualExclusion
type MutualExclusion<T, U> = (Without<T, U> & U) | (Without<U, T> & T)

interface Link {
  // Link 类型里不允许有 header
  id?: string
  icon?: string
  // isHidden?: boolean
  // disabled?: boolean
  expanded?: boolean
  title?: string
  href?: string
  deep?: number
  // orderNumber 序号, 用来标明同一级的子元素是排在第几个,
  // 用于窄状态时绝对定位的上边距, 因为绝对定位, 按照迭代
  // 的方法, 所有元素都成了兄弟元素, 只能通过这种序号的方法
  // 用 ts 计算出上边距
  // orderNumber?: number
  // 计算窄状态是的元素距离视口顶部的距离,
  // 由于都是兄弟元素的绝对定位, 只能通过 ts 计算出这个高度
  marginTop?: number
  // rootExpanded 表示当前点击的节点下所有子节点展开状态与
  // 共同的根节点是相同的,用在 updateTree 的函数上
  rootExpanded?: boolean | undefined
  rootId?: string
  // 表示当前被点击的菜单
  parentId?: string
  children?: IMenu[]
}

interface Header {
  // id?: string
  // deep?: number
  // expanded?: boolean
  // rootExpanded?: boolean | undefined

  header?: string
  clazz?: string
}
export type IMenu = MutualExclusion<Link, Header>

// https://juejin.cn/post/7017682613959655461
