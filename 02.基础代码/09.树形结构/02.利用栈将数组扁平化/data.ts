/* 
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
    id?: string
    deep?: number

    header?: string
    clazz?: string
  }
  export type IMenu = MutualExclusion<Link, Header>
*/

export interface IMenu {
  id?: string
  level?: number
  parentId?: string | null
  title?: string
  isVisible?: boolean
  icon?: string
  href?: string
  children?: IMenu[]
}

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
