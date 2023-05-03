import { ref, Ref,  } from "vue-demi"
export const currentId = ref<string | number | undefined | null>()
// 是不是点击在菜单外面的标记, 在菜单内部也需要
// 例如, 在 sideup.vue, sidedown.vue 等监听菜单
// 的组件中都需要引用这个变量,
// test-index.vue 也需要引用. 用于全局控制
export const sideupFlag = ref(false)
export const sidedownFlag = ref(false)
export const topleftFlag = ref(false)

export const removeIsShowed = (
  el: HTMLElement,
  clazz: string,
  currentId: Ref<string | number | undefined | null>,
  removeClazz: string
): void => {
  // 移除当前点击节点的上级节点下所有包含 clazz 的类
  const parent = findParentElement(el, clazz)
  if (!parent) return
  const all = parent.querySelectorAll(`.${removeClazz}`)
  all.forEach((item) => {
    const reg = new RegExp(removeClazz)
    if (currentId.value !== item.id) {
      currentId.value = null
      item.setAttribute("class", item.className.replace(reg, ""))
    }
  })
}

// 查找递归菜单指定类名的父级节点
export const findParentElement = (el: HTMLElement, clazz: string): HTMLElement | undefined | null => {
  if (!el || !el.className || typeof el.className === "object") return
  // 例如, 第1级 节点的父元素就是其本身
  if (el.className.includes(clazz)) return el
  const parentElement = el.parentElement
  if (parentElement) return findParentElement(parentElement, clazz)
}
// 侧边栏, 水平左侧菜单数据结构
export interface IMenu {
  id: string | number
  icon?: string
  title: string
  href?: string
  children?: IMenu[]
}
// 水平右侧菜单的数据结构
export interface ITopRightMenu {
  label: string
  key: string
}

// 鼠标方向辅助函数
// https://www.kongfandong.cn/blog/judge-direction-css-js/
interface Point {
  x: number
  y: number
}
const isSameSide = (p: Point, o: Point, a: Point, b: Point): boolean => {
  return (
    ((p.x - a.x) * (b.y - a.y) - (p.y - a.y) * (b.x - a.x)) * ((o.x - a.x) * (b.y - a.y) - (o.y - a.y) * (b.x - a.x)) >=
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

/** 这3个函数都是为了计算字符串宽度, 设置 .sublist 的宽度用的 */
// 获取递归数据中 title 文字个数的最大值
export const fetchTexteMaxLength = (arr: IMenu[], length = 0): number | undefined => {
  for (let i = 0; i < arr.length; i++) {
    let len: number = strLen(arr[i]!.title) // 当前元素 title 文字长度
    if (len > length) length = len
    if (arr[i]!.children) {
      // 如果有子元素, 再遍历子元素
      for (let j = 0; j < arr[i]!.children!.length; j++) {
        // 找出子元素中的最大值,返回这个最大值
        len = strLen(arr[i]!.children![j]!.title)

        if (len > length) length = len
      }
      return fetchTexteMaxLength(arr[i]!.children!, length)
    }
  }
  return length
}

// getTexteMaxLength, 仅求当前层级的字数最大值
export const getTexteMaxLength = (arr: IMenu[], length = 0) => {
  for (let i = 0; i < arr.length; i++) {
    const len: number = strLen(arr[i]!.title)
    if (len > length) length = len
  }
  return length
}
// 得到一个字符串码点的真实长度
function strLen(str: string) {
  let len = 0
  for (let i = 0; i < str.length; i++) {
    // i 在索引码元
    if (str !== "" && str.codePointAt(i)! > 0xffff) {
      // 当前字符串，在这个位置，占用了两个码元
      i++
    }
    len++
  }
  return len
}

