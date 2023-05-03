/**
 * 公共的响应式变量, 在侧边栏, 移动等地方都需要公用
 */
import { ref } from "vue"
/*
 * isNarrow 用到的地方,
 *  packages\layout\units-layout\c2-x-movable\useXMovable.ts
 *  packages\layout\units-layout\xy-mavable\useXYMovable.ts
 *  packages\menus\sideup\sideup.vue
 * packages\menus\sidedown\sidedown.vue
 */
export const isNarrow = ref<boolean>(true)
/**
 *  packages\layout\units-layout\xy-mavable\useAllDirectionResizeable.ts
 */
export const position = ref<number>()
