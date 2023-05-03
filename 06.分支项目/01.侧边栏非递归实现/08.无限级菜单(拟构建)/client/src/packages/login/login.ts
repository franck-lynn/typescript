import { ref, Ref, onMounted, watch } from "vue"
import Cookies from "js-cookie"
import { encode, decode } from "js-base64"
import { FormRules } from "naive-ui"

export interface ModelType {
  email: string | null
  password: string | null
}

export const isRemember = ref<boolean>(false)

export const rememberExpires = 7 // 记住密码的过期时间 7 天
export const tokenExpires = 7 // token 的过期时间 7 天

// 保存用户名和密码到 cookie
export const setPassword = (model: Ref<ModelType>) => {
  const email = model.value.email
  const password = model.value.password
  if (email && password) {
    Cookies.set("email", encode(email), { expires: rememberExpires })
    Cookies.set("password", encode(password), { expires: rememberExpires })
  }
}
// 获取用户名和密码
export const getPassword = (model: Ref<ModelType>) => {
  const e = Cookies.get("email")
  const email = e ? decode(e) : undefined
  const p = Cookies.get("password")
  const password = p ? decode(p) : undefined
  if (email && password) {
    model.value.email = email
    model.value.password = password
  }
}
// 擦除 保存在 cookie 里的用户名和密码
export const removePassword = () => {
  Cookies.remove("email", { path: "" })
  Cookies.remove("password", { path: "" })
}

// 验证规则
export const rules: FormRules = {
  email: {
    required: true,
    message: "请输入邮箱",
  },
  password: [
    {
      required: true,
      message: "请输入密码",
    },
  ],
}

// 初始时都是空值
export const model = ref<ModelType>({
  email: "lry_demry@163.com",
  password: "123456Aa",
})

export const useLogin = () => {
  onMounted(() => {
    const remember = Cookies.get("isRemember")
    isRemember.value = remember ? JSON.parse(remember) : false
    if (isRemember.value) {
      getPassword(model)
    }
  })

  watch(isRemember, () => {
    // watchEffect 首次加载后就执行, 这里不应该使用 watchEffect
    Cookies.set("isRemember", String(isRemember.value), { expires: rememberExpires })
    if (isRemember.value) {
      setPassword(model)
    } else {
      removePassword()
    }
  })
}
