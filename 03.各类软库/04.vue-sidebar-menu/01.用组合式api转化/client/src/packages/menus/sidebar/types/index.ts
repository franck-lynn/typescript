import type { HTMLAttributes, PropType } from "vue"
/* SidebarMenu.vue 用 */
export interface Menu {
  href?: string
  title?: string
  icon?: string | ItemIcon
  badge?: string | ItemBadge
  child?: MenuItem[]
  disabled?: boolean
  class?: string
  attributes?: object
  hidden?: boolean
  hiddenOnCollapse?: boolean
  external?: boolean
  exact?: boolean
}

/*  SidebarMenuIcon.vue 用 */
export interface ItemIcon {
  element?: string
  class?: string
  attributes?: Partial<HTMLAttributes>
  text?: string
}

/* SidebarMenuBadge.vue 用 */
export type ItemBadge = ItemIcon

/* SidebarMenuItem.vue 用 */
export interface MenuItem extends Menu {
  id?: string
  header?: string
  component?: string
  class?: string
  attributes?: Partial<HTMLAttributes>
  menu?: MenuItem[]
  props?: PropType<{ item: MenuItem; level: number }>
}
export interface MenuHeaderItem {
  header?: string
  hidden?: boolean
  hiddenOnCollapse?: boolean
  class?: string
  attributes?: object
}

export interface MenuComponentItem {
  component?: string
  props?: object
  hidden?: boolean
  hiddenOnCollapse?: boolean
  icon?: string
}

export type MenuData = MenuHeaderItem | MenuItem | MenuComponentItem

export interface SidebarMenu {
  /**
   * List of Items in the menu
   * Follow https://github.com/yaminncco/vue-sidebar-menu#item-properties
   */
  menu: MenuItem[]

  /**
   * Sidebar Collapse state (v-model:collapsed to enable two-way data binding).
   * by default false
   */
  collapsed?: boolean

  /**
   * Sidebar width (expanded).
   * by default 290px
   */
  width?: string

  /**
   * Sidebar width (collapsed).
   *  by default 65px
   */
  widthCollapsed?: string

  /**
   * Keep only one child opened at a time (first level only).
   * by default false
   */
  showOneChild?: boolean

  /**
   * Keep all child open.
   * by default false
   */
  showChild?: boolean

  /**
   * Position sidebar right to left.
   * by default false
   */
  rtl?: boolean

  /**
   * Make sidebar relative to the parent (by default the sidebar is relative to the viewport).
   * by default false
   */
  relative?: boolean

  /**
   * Hide toggle collapse button.
   * by default false.
   */
  hideToggle?: boolean

  /**
   * Sidebar theme (available themes: 'white-theme').
   *
   */
  theme?: string

  /**
   * Disable hover on collapse mode.
   * by default false.
   */
  disableHover?: boolean

  /**
   * The name of the custom link component (must be registered globally and define item as a prop)
   *
   */
  linkComponentName?: string
}

export type Emits = {
  (e: "item-click", event: MouseEvent, item: Menu): boolean
  (e: "update:collapsed", collapsed: string): boolean
}

export type PropsMenuItem = {
  item: MenuItem
  level?: number
}
