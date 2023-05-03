import { computed, ref, inject, watch } from "vue"
import type { ComputedRef, StyleValue } from "vue"
import { useRouter /* , useRoute  */ } from "vue-router"

import { useSidebar } from "./useSidebar"
import { activeRecordIndex, isSameRouteLocationParams, includesParams } from "./useRouterLink"
import { Menu, MenuItem, PropsMenuItem } from "../types"

/*  在 SidebarMenuItem.vue 中使用, 所有用它的属性  */
export default function useItem(props: PropsMenuItem) {
  // const router = getCurrentInstance().appContext.config.globalProperties.$router
  /* 
  要放在函数内部, 不然会报  inject() can only be used inside setup() or functional components.
  而且菜单点击也不能展开
  */
  const router = useRouter()

  const {
    getSidebarProps: sidebarProps /* 获取父组件的属性 */,
    getIsCollapsed: isCollapsed /* 是否折叠 */,
    getActiveShow: activeShow,
    getMobileItem: mobileItem,
    getMobileItemRect: mobileItemRect,
    getCurrentRoute: currentRoute /* 都是父组件注入进来的, 下面的也是, 只是没有重命名 */,
    updateActiveShow,
    setMobileItem,
    unsetMobileItem,
    clearMobileItemTimeout,
    emitItemClick,
  } = useSidebar() /* 父组件注入的 */

  /* 是由 SidebarMenuScroll.vue 提供的 */
  const emitScrollUpdate = inject<() => void>("emitScrollUpdate")

  const itemShow = ref(false)
  const itemHover = ref(false)

  const active = computed(() => {
    return isLinkActive(props.item, null) || isChildActive(props.item.child!)
  })

  const exactActive = computed(() => {
    return isLinkActive(props.item, true)
  })

  /* 这是定义的一个函数 */
  const isLinkActive = (item: Menu, exact: boolean | null) => {
    if (!item.href || item.external) return false
    if (router) {
      const route = router.resolve(item.href)

      /* 当前路由 */
      const routerCurrentRoute = router.currentRoute.value

      /* useRouterLink.ts 导入的函数 */
      const activeIndex = activeRecordIndex(route, routerCurrentRoute)

      if (exact || item.exact) {
        return (
          activeIndex > -1 &&
          activeIndex === routerCurrentRoute.matched.length - 1 &&
          // isSameRouteLocationParams(routerCurrentRoute.params, route.params)
          /* useRouterLink.ts 导入的函数 */
          isSameRouteLocationParams(routerCurrentRoute.params, route.params)
        )
      }
      /* useRouterLink.ts 导入的函数 */
      // console.log("上下文中的路由-----> ", activeIndex > -1 && includesParams(routerCurrentRoute.params, route.params))
      return activeIndex > -1 && includesParams(routerCurrentRoute.params, route.params)
    } else {
      // return item.href === currentRoute.value

      return item.href === currentRoute
    }
  }

  const isChildActive = (child: MenuItem[]) => {
    if (!child) return false
    return child.some((item) => {
      return isLinkActive(item, null) || isChildActive(item.child!)
    })
  }

  const onLinkClick = (event: MouseEvent) => {
    console.log("userItem 文件里的信息---> ", props.item.href)
    if (!props.item.href || props.item.disabled) {
      event.preventDefault()
      if (props.item.disabled) return
    }

    emitMobileItem(event, (event.currentTarget as HTMLElement).parentElement)

    if (hasChild.value) {
      if (!props.item.href || active.value) {
        show.value = !show.value
      }
    }

    if (emitItemClick) emitItemClick(event, props.item)
  }

  const onMouseOver = (event: MouseEvent) => {
    if (props.item.disabled) return
    event.stopPropagation()
    itemHover.value = true
  }

  const onMouseOut = (event: MouseEvent) => {
    event.stopPropagation()
    itemHover.value = false
  }

  const onMouseEnter = (event: MouseEvent) => {
    if (props.item.disabled) return
    if (sidebarProps!.disableHover) {
      if (isMobileItem.value && hasChild.value) {
        /* 父组件注入的 */
        if (clearMobileItemTimeout) clearMobileItemTimeout()
      }
    } else {
      if (clearMobileItemTimeout) clearMobileItemTimeout()
      emitMobileItem(event, event.currentTarget)
    }
  }

  const onMouseLeave = () => {
    if (sidebarProps!.disableHover && !hasChild.value) return
    if (isMobileItem.value) {
      if (unsetMobileItem) unsetMobileItem(false, !sidebarProps!.disableHover ? 300 : 0)
    }
  }

  const emitMobileItem = (event, itemEl) => {
    if (isMobileItem.value) return
    if (isCollapsed!.value) {
      setTimeout(() => {
        if (isFirstLevel.value) {
          if (!isMobileItem.value) {
            if (setMobileItem) setMobileItem({ item: props.item, itemEl })
          }
        }
        if (event.type === "click" && !hasChild.value) {
          if (unsetMobileItem) unsetMobileItem(false, !isFirstLevel.value ? 300 : 0)
        }
      }, 0)
    }
  }

  const onExpandEnter = (el) => {
    el.style.height = el.scrollHeight + "px"
  }

  const onExpandAfterEnter = (el) => {
    el.style.height = "auto"
    if (!isCollapsed!.value) {
      if (emitScrollUpdate) emitScrollUpdate()
    }
  }

  const onExpandBeforeLeave = (el) => {
    if (isCollapsed!.value && isFirstLevel.value) {
      el.style.display = "none"
      return
    }
    el.style.height = el.scrollHeight + "px"
  }

  const onExpandAfterLeave = () => {
    if (!isCollapsed!.value) {
      if (emitScrollUpdate) emitScrollUpdate()
    }
  }

  const show = computed({
    get: () => {
      if (!hasChild.value) return false
      if (isCollapsed!.value && isFirstLevel.value) return hover.value
      if (sidebarProps!.showChild) return true
      return sidebarProps!.showOneChild && isFirstLevel.value ? props.item.id === activeShow!.value : itemShow.value
    },
    set: (show) => {
      if (sidebarProps!.showOneChild && isFirstLevel.value) {
        if (updateActiveShow) show ? updateActiveShow(props.item.id!) : updateActiveShow(null)
      }
      itemShow.value = show
    },
  })

  const hover = computed(() => {
    return isCollapsed!.value && isFirstLevel.value ? isMobileItem.value : itemHover.value
  })

  const isFirstLevel = computed(() => {
    return props.level === 1
  })

  const isHidden = computed(() => {
    if (isCollapsed!.value) {
      if (props.item.hidden && props.item.hiddenOnCollapse === undefined) {
        return true
      } else {
        return props.item.hiddenOnCollapse === true
      }
    } else {
      return props.item.hidden === true
    }
  })

  const hasChild = computed(() => {
    return !!(props.item.child && props.item.child.length > 0)
  })

  const linkClass = computed(() => {
    return [
      "vsm--link",
      `vsm--link_level-${props.level}`,
      { "vsm--link_mobile": isMobileItem.value },
      { "vsm--link_hover": hover.value },
      { "vsm--link_active": active.value },
      { "vsm--link_disabled": props.item.disabled },
      { "vsm--link_open": show.value },
      props.item.class,
    ]
  })

  const linkAttrs = computed(() => {
    const href = props.item.href ? props.item.href : "#"
    const target = props.item.external ? "_blank" : "_self"
    const tabindex = props.item.disabled ? -1 : null
    const ariaCurrent = exactActive.value ? "page" : null
    const ariaHaspopup = hasChild.value ? true : null
    const ariaExpanded = hasChild.value ? show.value : null

    return {
      href,
      target,
      tabindex,
      "aria-current": ariaCurrent,
      "aria-haspopup": ariaHaspopup,
      "aria-expanded": ariaExpanded,
      ...props.item.attributes,
    }
  })

  const itemClass = computed(() => {
    return ["vsm--item", { "vsm--item_mobile": isMobileItem.value }]
  })

  const isMobileItem = computed(() => {
    return props.item.id === mobileItem!.value?.id
  })

  const mobileItemDropdownStyle = computed(() => {
    return [
      { position: "absolute" },
      { top: [mobileItemRect ? `${mobileItemRect.value.top + mobileItemRect.value.height}px` : 0] },
      !sidebarProps!.rtl ? { left: sidebarProps!.widthCollapsed } : { right: sidebarProps!.widthCollapsed },
      { width: `${mobileItemRect!.value.maxWidth}px` },
      { "max-height": `${mobileItemRect!.value.maxHeight}px` },
      { "overflow-y": "auto" },
    ]
  }) as ComputedRef<StyleValue>

  const mobileItemStyle = computed(() => {
    return [
      { position: "absolute" },
      { top: `${mobileItemRect!.value.top}px` },
      !sidebarProps!.rtl ? { left: sidebarProps!.widthCollapsed } : { right: sidebarProps!.widthCollapsed },
      { width: `${mobileItemRect!.value.maxWidth}px` },
      { height: `${mobileItemRect!.value.height}px` },
      { "padding-right": `${mobileItemRect!.value.padding}` },
      { "padding-left": `${mobileItemRect!.value.padding}` },
      { "z-index": "20" },
    ]
  }) as ComputedRef<StyleValue>

  const mobileItemBackgroundStyle = computed(() => {
    return [
      { position: "absolute" },
      { top: `${mobileItemRect!.value.top}px` },
      !sidebarProps!.rtl ? { left: "0px" } : { right: "0px" },
      { width: `${mobileItemRect!.value.maxWidth + parseInt(sidebarProps!.widthCollapsed!)}px` },
      { height: `${mobileItemRect!.value.height}px` },
      { "z-index": "10" },
    ]
  }) as ComputedRef<StyleValue>
  // as ComputedRef<Partial<StyleValue>>
  watch(
    () => active.value,
    () => {
      if (active.value) {
        show.value = true
      }
    },
    {
      immediate: true,
    }
  )

  return {
    active,
    exactActive,
    show,
    hover,
    isFirstLevel,
    isHidden,
    hasChild,
    linkClass,
    linkAttrs,
    itemClass,
    isMobileItem,
    mobileItemDropdownStyle,
    mobileItemStyle,
    mobileItemBackgroundStyle,
    onLinkClick,
    onMouseOver,
    onMouseOut,
    onMouseEnter,
    onMouseLeave,
    onExpandEnter,
    onExpandAfterEnter,
    onExpandBeforeLeave,
    onExpandAfterLeave,
  }
}
