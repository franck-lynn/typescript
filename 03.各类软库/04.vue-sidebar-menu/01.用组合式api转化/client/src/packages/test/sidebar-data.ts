import { MenuData } from "../menus/sidebar/types"
/* 
export const menu: MenuData[] = [
  {
    header: "Main Navigation 导航",
    hiddenOnCollapse: true,
  },
  {
    href: "/home",
    title: "Dashboard 控制面板",
    icon: "fa fa-user",
  },
  {
    href: "/home",
    title: "Charts 图表",
    icon: "fa fa-chart-area",
    child: [
      {
        href: "/home",
        title: "Sub Link",
      },
    ],
  },
]
 */
export const menu: MenuData[] = [
  {
    header: "Getting Started",
    hiddenOnCollapse: true,
  },
  {
    href: "/",
    title: "Installation",
    icon: "icon iconfont icon-xin",
  },
  {
    href: "/test/basic-usage",
    title: "Basic Usage",
    icon: "icon iconfont ",
  },
  {
    header: "Usage",
    hiddenOnCollapse: true,
  },
  {
    href: "/test/props",
    title: "Props",
    icon: "icon iconfont ",
  },
  {
    href: "/test/events",
    title: "Events",
    icon: "icon iconfont ",
  },
  {
    href: "/test/styling",
    title: "Styling",
    icon: "icon iconfont ",
  },
  // {
  //   component: markRaw(separator),
  // },
  {
    header: "Example",
    hiddenOnCollapse: true,
  },
  {
    href: "/test/disabled",
    title: "Disabled page",
    icon: "icon iconfont ",
    disabled: true,
  },
  {
    title: "Badge",
    icon: "icon iconfont ",
    badge: {
      text: "new",
      class: "vsm--badge_default",
    },
  },
  {
    href: "/test/page",
    title: "Dropdown Page",
    icon: "icon iconfont ",
    child: [
      {
        href: "/test/page/sub-page-1",
        title: "Sub Page 01",
        icon: "icon iconfont ",
      },
      {
        href: "/test/page/sub-page-2",
        title: "Sub Page 02",
        icon: "icon iconfont ",
      },
    ],
  },
  {
    title: "Multiple Level",
    icon: "icon iconfont ",
    child: [
      {
        title: "page",
      },
      {
        title: "Level 2 ",
        child: [
          {
            title: "page",
          },
          {
            title: "Page",
          },
        ],
      },
      {
        title: "Page",
      },
      {
        title: "Another Level 2",
        child: [
          {
            title: "Level 3",
            child: [
              {
                title: "Page",
              },
              {
                title: "Page",
              },
            ],
          },
        ],
      },
    ],
  },
]
