import { IMenu } from "../../../packages/menus/helpers/side-types"

export const sideupData: IMenu[] = [
  {
    header: "Getting Started",
  },
  {
    title: "定位",
    icon: "iconfont icon-xin",
    expanded: true,
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
            href: "/test/test-xy-movable",
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
    expanded: true,
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
