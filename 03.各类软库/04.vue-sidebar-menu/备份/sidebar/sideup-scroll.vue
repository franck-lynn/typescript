<script setup lang="ts">
import { MaybeRef, resolveUnref } from "@vueuse/shared"
import { ref, onMounted, watch, nextTick, provide, onUnmounted } from "vue"

const props = defineProps<{
  isNarrow: MaybeRef<boolean>
}>()

const scrollRef = ref<HTMLElement | null>(null)
const scrollBarRef = ref<HTMLElement | null>(null)
const scrollThumbRef = ref<HTMLElement | null>(null)

let cursorY = 0
let cursorDown = false

const onScrollUpdate = () => {
  if (!scrollRef.value) return
  nextTick(() => {
    updateThumb()
  })
}
const onScroll = () => {
  requestAnimationFrame(onScrollUpdate)
}

const onClick = (e: MouseEvent) => {
  if (scrollBarRef.value && scrollThumbRef.value) {
    const offset = Math.abs(scrollBarRef.value.getBoundingClientRect().y - e.clientY)
    const thumbHalf = scrollThumbRef.value.offsetHeight / 2
    updateScrollTop(offset - thumbHalf)
  }
}

const onMouseDown = (e: MouseEvent) => {
  e.stopImmediatePropagation()
  cursorDown = true
  window.addEventListener("mousemove", onMouseMove)
  window.addEventListener("mouseup", onMouseUp)
  if (scrollThumbRef.value && scrollThumbRef.value)
    cursorY = scrollThumbRef.value.offsetHeight - (e.clientY - scrollThumbRef.value.getBoundingClientRect().y)
}

const onMouseMove = (e: MouseEvent) => {
  if (!cursorDown) return
  if (scrollBarRef.value && scrollThumbRef.value) {
    const offset = e.clientY - scrollBarRef.value.getBoundingClientRect().y
    const thumbClickPosition = scrollThumbRef.value.offsetHeight - cursorY
    updateScrollTop(offset - thumbClickPosition)
  }
}

const onMouseUp = () => {
  cursorDown = false
  cursorY = 0
  window.removeEventListener("mousemove", onMouseMove)
  window.removeEventListener("mouseup", onMouseUp)
}

const updateThumb = () => {
  if (scrollRef.value && scrollThumbRef.value) {
    const heightPerc = (scrollRef.value.clientHeight * 100) / scrollRef.value.scrollHeight
    const thumbHeightPerc = heightPerc < 100 ? heightPerc : 0
    const thumbYPerc = (scrollRef.value.scrollTop * 100) / scrollRef.value.clientHeight || 0

    scrollThumbRef.value.style.height = `${thumbHeightPerc}%`
    scrollThumbRef.value.style.transform = `translateY(${thumbYPerc}%)`
  }
}

const updateScrollTop = (y: number) => {
  if (scrollBarRef.value && scrollRef.value) {
    const scrollPerc = (y * 100) / scrollBarRef.value.offsetHeight
    scrollRef.value.scrollTop = (scrollPerc * scrollRef.value.scrollHeight) / 100
  }
}

watch(
  () => resolveUnref(props.isNarrow),
  () => {
    onScrollUpdate()
  }
)

onMounted(() => {
  onScrollUpdate()
  window.addEventListener("resize", onScrollUpdate)
})
onUnmounted(() => {
  window.removeEventListener("resize", onScrollUpdate)
})

provide("emitScrollUpdate", onScrollUpdate)
</script>
<template>
  <div class="vsm--scroll-wrapper">
    <div class="vsm--scroll-overflow">
      <div ref="scrollRef" class="vsm--scroll" @scroll="onScroll">
        <slot />
      </div>
      <div ref="scrollBarRef" class="vsm--scroll-bar" @mousedown="onClick">
        <div ref="scrollThumbRef" class="vsm--scroll-thumb" @mousedown="onMouseDown" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.vsm--scroll-wrapper {
  position: relative;
  display: flex;
  min-height: 0;
  flex: 1;
  &:hover,
  &:focus,
  &:active {
    .vsm--scroll-bar {
      opacity: 1;
    }
  }
}
.vsm--scroll-overflow {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.vsm--scroll {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }
  & > .vsm--menu {
    position: static !important;
    transition: 0.3s width ease;
  }
}
.vsm--scroll-bar {
  position: absolute;
  top: 2px;
  bottom: 2px;
  left: calc(100% - 4px);
  z-index: 5;
  width: 6px;
  border-radius: 4px;
  opacity: 0;
  transition: 0.3s opacity ease;
}
.vsm--scroll-thumb {
  display: block;
  border-radius: 4px;
  background-color: #aaaaaa;
  opacity: 0.5;
  transition: 0.3s opacity ease;
  cursor: pointer;
  user-select: none;
  &:hover {
    opacity: 1;
  }
}
</style>
