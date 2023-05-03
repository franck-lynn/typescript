import { nanoid } from "nanoid"
import { IMenu, ITopRightMenu } from "../menus/helpers"
/** 侧边栏上数据 */
export const sideupData: IMenu[] = [
  {
    id: nanoid(4),
    icon: "",
    title: "注册登录",
    children: [
      { id: nanoid(4), title: "登录" },
      { id: nanoid(4), title: "注册" },
    ],
  },
  { id: nanoid(4), icon: "", title: "菜单一" },
]
export const sidedownData: IMenu[] = [
  { id: nanoid(4), icon: "", title: "菜单一" },
  {
    id: nanoid(4),
    icon: "",
    title: "菜单二",
    children: [
      { id: nanoid(4), title: "菜单2-1" },
      {
        id: nanoid(4),
        title: "菜单2-2",
        children: [
          {
            id: nanoid(4),
            title: "菜单2-2-1",
            children: [
              { id: nanoid(4), title: "菜单2-2-1-1" },
              {
                id: nanoid(4),
                title: "菜单2-2-1-2",
                children: [
                  { id: nanoid(4), title: "菜单2-2-1-2-1" },
                  { id: nanoid(4), title: "菜单2-2-1-2-2" },
                ],
              },
            ],
          },
          { id: nanoid(4), title: "菜单2-2-2" },
        ],
      },
    ],
  },
]

export const topleftData: IMenu[] = [
  {
    id: nanoid(4),
    icon: "icon-middleware",
    title: "各种库",
    children: [
      {
        id: nanoid(4),
        title: "pinia ",
        children: [{ id: nanoid(4), title: "pinia状态管理", href: "/test/test-pinia" }],
      },
      {
        id: nanoid(4),
        title: "vue ",
        children: [
          { id: nanoid(4), title: "父子组件之v-model", href: "/test/test-v-model" },
          { id: nanoid(4), title: "祖孙组件之v-model", href: "/test/test-grandson-v-model" },
        ],
      },
    ],
  },

  {
    id: nanoid(4), // css 使用方法的测试菜单
    icon: "icon-test-tube",
    title: "测试",
    children: [
      // 第1组
      {
        id: nanoid(4),
        title: "布局测试",
        children: [
          { id: nanoid(4), title: "empty page", href: "/test/test-empty" },
          { id: nanoid(4), title: "测试换行", href: "/test/test-wrappable" },
          { id: nanoid(4), title: "行布局", href: "/test/test-r-layout" },
          { id: nanoid(4), title: "列布局", href: "/test/test-c-layout" },
        ],
      },
      // 第2组
      {
        id: nanoid(4),
        title: "css使用及测试",
        children: [
          { id: nanoid(4), title: "测试一些操作", href: "/test/test-css-somethings" },
          { id: nanoid(4), title: "css选择器", href: "/test/test-css-selector" },
          { id: nanoid(4), title: "尺寸设定", href: "/test/test-css-horizontal" },
          { id: nanoid(4), title: "垂直分布", href: "/test/test-css-vertical" },
          { id: nanoid(4), title: "滚动条", href: "/test/test-css-scroll" },
          { id: nanoid(4), title: "测试各种位置和尺寸", href: "/test/test-css-position" },
          { id: nanoid(4), title: "测试resize的transition效果", href: "/test/test-resize-transition" },
          { id: nanoid(4), title: "图片处理", href: "/test/test-images" },
          { id: nanoid(4), title: "flex 溢出处理", href: "/test/test-css-overflow" },
        ],
      },
      // 第3组
      {
        id: nanoid(4),
        title: "组件测试",
        children: [
          { id: nanoid(4), title: "测试水平菜单", href: "/test/test-top-nav" },
          { id: nanoid(4), title: "avatar图片显示", href: "/test/test-vuer-avatar" },

          { id: nanoid(4), title: "测试单图片上传服务器", href: "/test/test-single-img-upload" },
          { id: nanoid(4), title: "avatar图片裁剪", href: "/test/test-avatar-cropper" },
          { id: nanoid(4), title: "avatar图片裁剪本地组件", href: "/test/test-vuer-avatar-cropper" },
          { id: nanoid(4), title: "可移动缩放对话框布局", href: "/test/test-vuer-dialog-layout" },
          { id: nanoid(4), title: "可移动缩放对话框", href: "/test/test-vuer-dialog" },
        ],
      },
      // 第4组
      {
        id: nanoid(4),
        title: "测试各种请求",

        children: [
          { id: nanoid(4), title: "测试表单提交", href: "/test/test-form-submit" },
          { id: nanoid(4), title: "测试fetch请求", href: "/test/test-fetch" },
        ],
      },
    ],
  },
  {
    id: nanoid(4), // css 使用方法的测试菜单
    icon: "icon-link",
    title: "联调",
    children: [{ id: nanoid(4), title: "apollo客户端发送数据", href: "/test/test-urql-send-data" }],
  },
]

/** 以下是右侧菜单数据部分 */
export const options: ITopRightMenu[] = [
  { label: "合同状态", key: "contract" },
  { label: "发货单号", key: "shipping" },
  { label: "快递查询", key: "express" },
]
export const langs: ITopRightMenu[] = [
  { label: "简体中文", key: "zh-cn" },
  { label: "英文", key: "en" },
]
export const custom: ITopRightMenu[] = [
  { label: "个人主页", key: "profile" },
  { label: "用户设置", key: "user-settings" },
  { label: "退出", key: "destroy-user" },
]
export const badge = ref<number>(8)
