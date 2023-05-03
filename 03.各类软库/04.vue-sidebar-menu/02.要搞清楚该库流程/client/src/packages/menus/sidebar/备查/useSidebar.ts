import { ref, computed, inject, provide, reactive, toRefs } from "vue"
import { Emits, Menu, SidebarMenu } from "../types"

export const initSidebar = (props: SidebarMenu, emits: Emits) => {
  /* props 是由 SidebarMenu.vue 的属性传递过来的 */
  const { collapsed, relative, width, widthCollapsed, rtl } = toRefs(props)
  /* 获取到的是根组件, SidebarMenu.vue 定义 ref, 调用 initSidebar, 相当于 onMounted() 函数中运行 */
  const sidebarRef = ref<HTMLElement | null>(null)
  /* 是否是折叠 */
  const isCollapsed = ref(collapsed!.value)

  const activeShow = ref<string>("")

  /* 移动端 */
  const mobileItem = reactive({
    item: null,
    rect: {
      top: 0,
      height: 0,
      padding: "",
      maxHeight: 0,
      maxWidth: 0,
    },
    timeout: 0,
  })
  const getMobileItem = computed(() => mobileItem.item)
  const getMobileItemRect = computed(() => mobileItem.rect)
  const currentRoute = ref(window.location.pathname + window.location.search + window.location.hash)

  /* 这些函数都提供给子组件使用 */
  /* 更新是否折叠 */
  const updateIsCollapsed = (val: boolean) => {
    isCollapsed.value = val
  }

  /* 更新激活显示 */
  const updateActiveShow = (id: string) => {
    activeShow.value = id
  }

  const setMobileItem = ({ item, itemEl }) => {
    clearMobileItemTimeout()
    const linkEl = itemEl.children[0]
    const { top: linkTop, bottom: linkBottom, height: linkHeight } = linkEl.getBoundingClientRect()

    const { left: sidebarLeft, right: sidebarRight } = sidebarRef.value
      ? sidebarRef.value.getBoundingClientRect()
      : { left: 0, right: 0 }

    const offsetParentTop = linkEl.offsetParent.getBoundingClientRect().top

    let parentHeight = window.innerHeight
    let parentWidth = window.innerWidth
    let parentTop = 0
    let parentRight = parentWidth
    const maxWidth = parseInt(width!.value!) - parseInt(widthCollapsed!.value!)
    if (relative!.value) {
      const parent = sidebarRef.value ? sidebarRef.value.parentElement : undefined
      if (parent) {
        parentHeight = parent.clientHeight
        parentWidth = parent.clientWidth
        parentTop = parent.getBoundingClientRect().top
        parentRight = parent.getBoundingClientRect().right
      }
    }

    const rectWidth = rtl!.value ? parentWidth - (parentRight - sidebarLeft) : parentRight - sidebarRight

    updateMobileItem(item)
    updateMobileItemRect({
      top: linkTop - offsetParentTop,
      height: linkHeight,
      padding: window.getComputedStyle(linkEl).paddingRight,
      maxWidth: rectWidth <= maxWidth ? rectWidth : maxWidth,
      maxHeight: parentHeight - (linkBottom - parentTop),
    })
  }

  const unsetMobileItem = (immediate = true, delay = 800) => {
    if (!getMobileItem.value) return
    clearMobileItemTimeout()
    if (immediate) {
      updateMobileItem(null)
      return
    }
    mobileItem.timeout = setTimeout(() => {
      updateMobileItem(null)
    }, delay)
  }

  const clearMobileItemTimeout = () => {
    if (mobileItem.timeout) clearTimeout(mobileItem.timeout)
  }

  const updateMobileItem = (item) => {
    mobileItem.item = item
  }

  const updateMobileItemRect = ({ top, height, padding, maxWidth, maxHeight }) => {
    mobileItem.rect.top = top
    mobileItem.rect.height = height
    mobileItem.rect.padding = padding
    mobileItem.rect.maxWidth = maxWidth
    mobileItem.rect.maxHeight = maxHeight
  }

  const updateCurrentRoute = () => {
    const route = window.location.pathname + window.location.search + window.location.hash

    currentRoute.value = route
  }

  /* onItemClick 在 SidebarMenu.vue 中, 除了可以向父组件发射消息, 也可以注入到子组件中, 给子组件使用*/
  const onItemClick = (event: MouseEvent, item: Menu) => {
    emits("item-click", event, item)
  }

  provide<SidebarMenu>("vsmProps", props)
  provide("getSidebarRef", sidebarRef)
  provide("getIsCollapsed", isCollapsed)
  provide("getActiveShow", activeShow)
  provide("getMobileItem", getMobileItem)
  provide("getMobileItemRect", getMobileItemRect)
  provide("getCurrentRoute", currentRoute)

  provide("updateIsCollapsed", updateIsCollapsed)
  provide("updateActiveShow", updateActiveShow)
  provide("setMobileItem", setMobileItem)
  provide("unsetMobileItem", unsetMobileItem)
  provide("clearMobileItemTimeout", clearMobileItemTimeout)
  provide("onRouteChange", updateCurrentRoute)
  provide("emitItemClick", onItemClick)

  return {
    getSidebarRef: sidebarRef,
    getIsCollapsed: isCollapsed,
    getActiveShow: activeShow,
    getMobileItem,
    getMobileItemRect,
    getCurrentRoute: currentRoute,
    updateIsCollapsed,
    updateActiveShow,
    setMobileItem,
    unsetMobileItem,
    clearMobileItemTimeout,
    updateCurrentRoute,
    onItemClick,
  }
}

export const useSidebar = () => ({
  getSidebarProps: inject<SidebarMenu>("vsmProps"),
  getSidebarRef: inject("getSidebarRef"),
  getIsCollapsed: inject<Ref<boolean>>("getIsCollapsed"),
  getActiveShow: inject<Ref<string>>("getActiveShow"),
  getMobileItem: inject<ComputedRef>("getMobileItem"),
  getMobileItemRect: inject<ComputedRef>("getMobileItemRect"),
  getCurrentRoute: inject("getCurrentRoute"),
  updateIsCollapsed: inject("updateIsCollapsed"),
  updateActiveShow: inject<(id: string | null) => void>("updateActiveShow"),
  setMobileItem: inject<({ item, itemEl }) => void>("setMobileItem"),
  unsetMobileItem: inject<(immediate: boolean, delay: number) => void>("unsetMobileItem"),
  clearMobileItemTimeout: inject<() => void>("clearMobileItemTimeout"),
  onRouteChange: inject("onRouteChange"),
  emitItemClick: inject<(event: MouseEvent, item: Menu) => void>("emitItemClick"),
})
