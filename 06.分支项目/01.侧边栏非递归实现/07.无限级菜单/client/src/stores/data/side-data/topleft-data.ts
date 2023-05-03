import { IMenu } from "../../../packages/menus/types"

export const topleftData: IMenu[] = [
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
    title: "布局",
    icon: "icon-global",
    expanded: true,
    children: [
      {
        href: "/test/r3-layout",
        title: "3行布局",
        icon: "iconfont icon-xin",
      },
      {
        href: "/test/c3-layout",
        title: "3列布局",
        icon: "iconfont icon-xin",
      },
    ],
  },
  {
    title: "代码生成",
    children: [
      {
        href: "/test/test-codegen-hello",
        title: "hello world",
      },
      {
        href: "/test/test-codegen-mutation",
        title: "mutation测试",
      },
    ],
  },
]
