import { ref, computed, CSSProperties } from "vue-demi"
/**
 * 1. 观察 vuer-avatar.vue, 有圆形, 方形和长方形
 * 2. 长方形和 方圆形用 变量 isRectangle 控制
 * 3. 方形和圆形用 属性 props.rounded 来控制
 * 4. 所有变量都是字符串. 方形和圆形实质上是一种形状, 只是圆弧角的大小不同.
 * 5. 属性 props.rectangle = 'true' 时为长方形, 否则为方形或圆形
 * 6. 样式分为 图片样式和文字样式, 二者之上的容器的样式. 样式的主要差别是宽度,
 *    长方形时 包括文字和图片, 方形和圆形时仅图片
 */
// 背景颜色
const backgroundColors = ref([
  "#F44336",
  "#FF4081",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFC107",
  "#FF9800",
  "#FF5722",
  "#795548",
  "#9E9E9E",
  "#607D8B",
])

export const useVuerAvatar = (props: {
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
}) => {
  const imgError = ref(false)
  const size = props.size ? parseInt(props.size) : 33
  const radius = props.rounded ? (isPercent(props.rounded) ? `${props.rounded}` : `${parseInt(props.rounded)}px`) : 0
  const lighten = props.lighten ? props.lighten : 80

  // --------------- 变量导出部分 ---------------
  const src = computed(() => props.src)
  const isImage = computed(() => !imgError.value && Boolean(props.src)) // 图片没有错误并且有图片地址
  const isRectangle = computed(() => (props.rectangle ? JSON.parse(props.rectangle) : undefined))
  // --------------- 样式导出部分 ---------------
  // 图片文字的容器样式
  const style = computed(() => {
    return <CSSProperties>{
      display: "inline-flex",
      height: `${size}px`,
      borderRadius: radius,
      userSelect: "none",
      flexShrink: 0,
    }
  })

  // 图片的样式
  const backgroundImageStyle = computed(() => {
    return <CSSProperties>{
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
      width: `${size}px`,
      height: `${size}px`,
      // border: "2px solid red", // 可以显示图片的边框
      borderRadius: hasImageAndText() ? ` 0 ${radius} ${radius} 0` : radius,
      background: `transparent url('${props.src}')  repeat center`,
      backgroundSize: "auto 100%",
    }
  })

  // 文字的样式
  const usernameStyle = computed(() => {
    return <CSSProperties>{
      display: "flex",
      width: `${usernameWidth()}px`,
      height: `${size}px`,
      fontSize: `${size * 0.618}px`,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: usernameBackground(),
      color: usernameFontcolor(),
      userSelect: "none",
      borderRadius: hasImageAndText() ? `${radius} 0 0 ${radius} ` : radius,
    }
  })

  // 先梳理下是 1. 圆形, 2. 方形, 还是 3. 长方形
  // 没有 isRectangle 即为方形或者圆形
  const userInitial = computed(() => {
    if (isRectangle.value) {
      return props.username
    }
    if (!isImage.value && props.username) {
      const initials = props.initials || getInitials(props.username)
      return initials
    }
    return ""
  })

  // --------------- 辅助函数部分 ---------------
  const usernameWidth = () => {
    if (isRectangle.value) {
      const num = strLen(userInitial.value!) // 字数
      const fontWidth = size * 0.618
      return num * fontWidth + 0.382 * size
    } else {
      return size
    }
  }

  const hasImageAndText = () => isRectangle.value && props.src && isImage.value && props.username

  const usernameBackground = () => {
    return props.backgroundColor || randomBackgroundColor(props.username!.length, backgroundColors.value)
  }
  const usernameFontcolor = () => {
    return props.color || lightenColor(usernameBackground() as string, lighten)
  }

  return {
    style, // 图片文字容器样式
    backgroundImageStyle, // 图片样式
    usernameStyle, // 文字样式
    src,
    userInitial,
    isImage,
    // 当图片加载错误时, 例如路径不对, 会触发此错误事件
    onImgError: () => (imgError.value = true),
    isRectangle,
  }
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
/* 
  // 根据 username 和 size 求字符宽度
  function getTextLength(username: string, size: string) {
    const num = strLen(username) + 0.8
    // 名字的字数 + 图片的 size + margin
    const width = num * parseInt(size) * 0.618
    return width
  }
*/

/* 
  function getImgAndTextLength(username: string, size: string) {
    return getTextLength(username, size) + 2 * parseInt(size)
  }
*/
// 判断一个字符串是不是百分数
function isPercent(pattern: string) {
  if (/^\d+(\.\d+)?%$/.test(pattern)) {
    return true
  } else {
    return false
  }
}

// 辅助函数
function getInitials(username: string) {
  const parts = username.split(/[ -.]/) // 用 空格或者 - .分割字符串
  let initials = ""
  for (let i = 0; i < parts.length; i++) {
    initials += parts[i]!.charAt(0)
  }
  if (initials.length > 3 && initials.search(/[A-Z]/) !== -1) {
    initials = initials.replace(/[a-z]+/g, "")
  }
  initials = initials.substring(0, 3).toUpperCase()
  return initials
}
// 随机色
function randomBackgroundColor(seed: number, colors: string[]) {
  return colors[seed % colors.length]
}

function lightenColor(hex: string, amt: number) {
  // From https://css-tricks.com/snippets/javascript/lighten-darken-color/
  let usePound = false
  if (hex[0] === "#") {
    hex = hex.slice(1)
    usePound = true
  }
  const num = parseInt(hex, 16)
  let r = (num >> 16) + amt
  if (r > 255) r = 255
  else if (r < 0) r = 0
  let b = ((num >> 8) & 0x00ff) + amt
  if (b > 255) b = 255
  else if (b < 0) b = 0
  let g = (num & 0x0000ff) + amt
  if (g > 255) g = 255
  else if (g < 0) g = 0
  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16)
}
