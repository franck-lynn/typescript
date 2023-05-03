export const data: IMenu[] = [
  {
    title: "定位",
    icon: "iconfont icon-xin",
    children: [
      { title: "定位1", href: "/test/test-position1" },
      { title: "定位2", href: "/test/test-position2" },
      {
        href: "/test/test-position3",
        title: "定位3",
        icon: "iconfont icon-xin",
      },
      {
        href: "/test/test-position4",
        title: "定位4",
        icon: "iconfont icon-xin",
      },
      {
        title: "有3级菜单",
        children: [
          { href: "/test/test-vue-dialog", title: "全向可移动缩放对话框", icon: "iconfont icon-xin" },
          {
            href: "/test/basic-usage",
            title: "Basic Usage",
            icon: "iconfont icon-xin",
          },
        ],
      },
    ],
  },
  {
    href: "/test/page",
    title: "Dropdown Page",
    icon: "iconfont icon-xin",
    children: [
      {
        href: "/test/page/sub-page-1",
        title: "Sub Page 01",
        icon: "iconfont icon-xin",
      },
      {
        href: "/test/page/sub-page-2",
        title: "Sub Page 02",
        icon: "iconfont icon-xin",
      },
    ],
  },
]

// ! 类型定义, 互斥类型
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
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
  parentId?: string
  children?: IMenu[]
}

interface Header {
  header?: string
  clazz?: string
}
export type IMenu = MutualExclusion<Link, Header>

// ! 以下是广度优先算法的树形结构的实现
// ! 广度优先对于多根树统计层数非常麻烦, 不优雅, 不知如何实现
const bsf = (items: IMenu[]) => {
  // 因为数据有很多个根节点, 利用广度优先遍历,
  // 所以一上来就要做循环, 广度优先是从一个根节点开始的
  // quene 队列, 排队节点
  const quene: IMenu[] = []
  // 保存遍历后的结果
  const result: IMenu[] = []
  for (let i = 0; i < items.length; i++) {
    // 把所有根节点放进 队列 quene
    quene.push(items[i])
  }
  while (quene && quene.length > 0) {
    // 现在队列里有数据了, 依次弹出这些数据. 用一个变量 node 接收
    const node = quene.shift()

    // 判断 node 是否存在
    if (node) {
      // ! 把弹出的节点用 result 接收, 用于返回, 要在在这里接收
      result.push(node)

      // 找出这个节点的孩子节点, 也就是广度里的邻接节点
      const child = node.children
      if (child) {
        // 如果存在, 把孩子节点入列, 由于是树结构, 所以不用判断有没有见过
        for (let i = 0; i < child.length; i++) {
          quene.push(child[i])
        }
        // 接下来进入 while 循环
      }
    }
  }
  // ! 等待 while 循环结束, 返回遍历的结果
  return result
}

console.log(bsf(data))
