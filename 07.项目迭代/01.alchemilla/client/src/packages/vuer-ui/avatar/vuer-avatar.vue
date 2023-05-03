<script setup lang="ts">
import { CSSProperties } from "vue"
import { useVuerAvatar } from "./vuer-avatar"
const props = withDefaults(
  defineProps<{
    username?: string
    initials?: string // 与名字首字母不一样的, 可以自定义字母作为名字
    backgroundColor?: string // 背景色
    color?: string
    customStyle?: CSSProperties | undefined | null
    inline?: string
    rectangle?: string
    size?: string
    src?: string
    rounded?: string
    lighten?: number
  }>(),
  {
    username: "",
    initials: "",
    backgroundColor: "",
    color: "",
    customStyle: null,
    inline: "",
    rectangle: "false",
    size: "32",
    src: "",
    rounded: "",
    lighten: 80,
  }
)

const {
  style, // 最外层容器的样式
  backgroundImageStyle,
  usernameStyle,
  src,
  userInitial,
  isImage,
  onImgError,
  isRectangle,
} = useVuerAvatar(props)

// 只有在长方形的时候才图片文字都显示
// 圆形, 方形的时候只选择一种显示,有图片显示图片, 无图片显示文字
</script>
<template>
  <div class="vuer-avatar" :style="style" aria-hidden="true">
    <div v-show="!isImage || (isRectangle && username)" :style="usernameStyle">{{ userInitial }}</div>
    <div v-if="isImage && src" :style="backgroundImageStyle">
      <img style="display: none" :src="src" @error="onImgError" />
    </div>
  </div>
</template>
