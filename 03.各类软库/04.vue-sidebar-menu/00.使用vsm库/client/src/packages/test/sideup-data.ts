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
export const items = [
  {
    header: "Getting Started",
  },
  {
    href: "/",
    title: "Installation",
    icon: "iconfont icon-xin",
  },
  {
    href: "/test/basic-usage",
    title: "Basic Usage",
    icon: "iconfont icon-xin",
  },
  {
    header: "Usage",
  },
  {
    href: "/test/props",
    title: "Props",
    icon: "iconfont icon-xin",
  },
  {
    href: "/test/events",
    title: "Events",
    icon: "iconfont icon-xin",
  },
  {
    href: "/test/styling",
    title: "Styling",
    icon: "iconfont icon-xin",
  },
  // {
  //   component: markRaw(separator),
  // },
  {
    header: "Example",
  },
  {
    href: "/test/disabled",
    title: "Disabled page",
    icon: "iconfont icon-xin",
    disabled: true,
  },
  {
    title: "Badge",
    icon: "iconfont icon-xin",
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
      },
    ],
  },
  {
    title: "Multiple Level",
    icon: "iconfont icon-xin",
    children: [
      {
        title: "page",
      },
      {
        title: "Level 2 ",
        children: [
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
        children: [
          {
            title: "Level 3",
            children: [
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
