import { IS_NARROW, LEFT_SIDE_WIDTH, MIN_WIDTH } from "./useXMovable"
import { onMounted } from "vue"
import { useDebounceFn, useWindowSize } from "@vueuse/core"

const DELAY_TIMES = 500 // 毫秒
const LARGE_SCREEN = 764

export const resizableIsNarrow = ref<boolean>()
export const resizableLeftSideWidth = ref<number>()

export const resizeFlag = ref<boolean>()

export const useWindowResizable = () => {
  const _leftSideWidth = localStorage.getItem(LEFT_SIDE_WIDTH)
  let _l = 0
  if (_leftSideWidth) _l = parseInt(_leftSideWidth)
  else return
  if (_l <= MIN_WIDTH) return

  resizeFlag.value = true

  const { width } = useWindowSize()

  const debouncedResize = useDebounceFn(resize, DELAY_TIMES)

  onMounted(() => {
    window.addEventListener("resize", debouncedResize, true)
  })
  onUnmounted(() => {
    window.removeEventListener("resize", debouncedResize)
  })

  function resize() {
    // 监听窗口大小的变化, 当小于大屏时设置为窄
    // 当大于大屏时, 原来是窄还是窄, 原来是宽还是宽
    if (width.value < LARGE_SCREEN) {
      resizableIsNarrow.value = true
      resizableLeftSideWidth.value = 45
    } else {
      const _isNarrow = localStorage.getItem(IS_NARROW)
      if (_isNarrow) resizableIsNarrow.value = JSON.parse(_isNarrow)
      if (_leftSideWidth) resizableLeftSideWidth.value = parseInt(_leftSideWidth)
    }
  }
}
