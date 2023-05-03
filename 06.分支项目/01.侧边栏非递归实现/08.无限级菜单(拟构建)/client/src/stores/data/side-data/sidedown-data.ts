import { IMenu } from "../../../packages/menus/types"

export const sidedownData: IMenu[] = [
  {
    title: "定位",
    icon: "icon-a-iconic_11",
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
        title: "有3级菜单",
        children: [
          { href: "/test/test-vue-dialog", title: "全向可移动缩放对话框" },
          {
            title: "Basic Usage",
            children: [{ title: "四级菜单", href: "/test/test-xy-movable" }],
          },
        ],
      },
      {
        href: "/test/test-position4",
        title: "定位4",
        icon: "iconfont icon-xin",
      },
    ],
  },
  {
    href: "/test/page",
    title: "Dropdown Page",
    icon: "icon-global",
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
