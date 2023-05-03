import { ref, onMounted, onUnmounted, watchEffect, } from "vue"
// import { isNarrow } from "../../menu-layout/c2-resizeable"
// import { isNarrow } from "../menu-layout/c2-resizeable"
const isNarrow = ref(false)
export interface IMenu {
    id: string | number
    icon?: string
    title: string
    href?: string
    children?: IMenu[]
}

export interface ITabsHead {
    id: string | number
    icon?: string
    badge?: number
    title?: string
    tab: string
    username?: string
    src: string
}

export interface ITabsBody {
    id: string | number
    href: string
    icon?: string
    title: string
}
export interface IRouterPaths {
    group: string
    paths: [string, string?, string?][]
}


// export {type IMenu, type ITabsHead, type ITabsBody, type IRouterPaths} from './data-interface'
// 菜单共分 4块, 每一块菜单有一个 current tab 单独控制
// 当点击其中一块菜单时, 另外三块菜单要关闭
export const currentSidebarTab = ref<string | number>("")
export const currentdropdownTab = ref<string | number>("")
export const currentTabulate = ref<string | number>("")
export const currentSlideTab = ref<string | number>("")


export const useCloseTab = () => {
    const cancelTabs = (msg: string, e?: Event) => {
        // 如果是窄状态, 就直接关闭
        if (isNarrow.value) {
            if (msg === "close") {
                // currentTreeNode.value = ""
                currentSidebarTab.value = ""
                currentdropdownTab.value = ""
                currentTabulate.value = ""
                currentSlideTab.value = ""
            }
        } else {
            // 是宽状态
            currentdropdownTab.value = ""
            currentTabulate.value = ""
            currentSlideTab.value = ""
        }
    }

    onMounted(() => {
        //! 这里这样监听事件后就可以关闭所有的菜单了
        window.addEventListener("click", (e: Event) => cancelTabs("close", e))
    })
    onUnmounted(() => {
        window.removeEventListener("click", () => cancelTabs("close"))
    })
}

// 鼠标方向辅助函数
// https://www.kongfandong.cn/blog/judge-direction-css-js/
interface Point {
    x: number
    y: number
}
const isSameSide = (p: Point, o: Point, a: Point, b: Point): boolean => {
    return (
        ((p.x - a.x) * (b.y - a.y) - (p.y - a.y) * (b.x - a.x)) *
            ((o.x - a.x) * (b.y - a.y) - (o.y - a.y) * (b.x - a.x)) >=
        0
    )
}
// 判断鼠标进入的方向
export const mouseEnterDirection = (e: MouseEvent) => {
    const el = e.currentTarget as HTMLElement
    const { top, left, width, height } = el.getBoundingClientRect()
    const a = { x: left, y: top }
    const b = { x: left + width, y: top }
    const c = { x: left + width, y: top + height }
    const d = { x: left, y: top + height }
    const o = { x: left + width / 2, y: top + height / 2 }
    const p = { x: e.x, y: e.y }
    if (isSameSide(p, o, a, b) && isSameSide(p, a, o, b) && isSameSide(p, b, o, a)) {
        return "enter-from-top"
    } else if (isSameSide(p, o, b, c) && isSameSide(p, b, o, c) && isSameSide(p, c, b, o)) {
        return "enter-from-right"
    } else if (isSameSide(p, o, c, d) && isSameSide(p, c, o, d) && isSameSide(p, d, o, c)) {
        return "enter-from-buttom"
    } else if (isSameSide(p, o, a, d) && isSameSide(p, a, o, d) && isSameSide(p, d, o, a)) {
        return "enter-from-left"
    } else {
        return "enter-from-top"
    }
}
// 鼠标离开的方向
export const mouseLeaveDirection = (e: MouseEvent) => {
    const el = e.currentTarget as HTMLElement
    const { top, left, width, height } = el.getBoundingClientRect()
    const a = { x: left, y: top }
    const b = { x: left + width, y: top }
    const c = { x: left + width, y: top + height }
    const d = { x: left, y: top + height }
    const o = { x: left + width / 2, y: top + height / 2 }
    const p = { x: e.x, y: e.y }
    if (!isSameSide(p, o, a, b) && isSameSide(p, a, o, b) && isSameSide(p, b, o, a)) {
        return "leave-from-top"
    } else if (!isSameSide(p, o, b, c) && isSameSide(p, b, o, c) && isSameSide(p, c, b, o)) {
        return "leave-from-right"
    } else if (!isSameSide(p, o, c, d) && isSameSide(p, c, o, d) && isSameSide(p, d, o, c)) {
        return "leave-from-botton"
    } else if (!isSameSide(p, o, a, d) && isSameSide(p, a, o, d) && isSameSide(p, d, o, a)) {
        return "leave-from-left"
    } else {
        return "leave-from-top"
    }
}
