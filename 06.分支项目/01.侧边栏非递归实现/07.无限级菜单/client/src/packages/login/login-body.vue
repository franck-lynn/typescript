<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"

import { FormInst, useMessage } from "naive-ui"
import Cookies from "js-cookie"

import { tokenExpires, rules, setPassword, removePassword, isRemember, model, useLogin } from "./login"

// import { useMutation } from "@urql/vue"
import { useLoginMutation } from "../../typings"

const router = useRouter() // 本页面有处理路由跳转

const formRef = ref<FormInst | null>(null)
const message = useMessage()

useLogin()

const { executeMutation } = useLoginMutation()

const onSubmit = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (errors) {
      return message.error("验证失败")
    } else {
      const data = {
        loginInput: {
          email: model.value.email,
          password: model.value.password,
        },
      }
      const [result] = await executeMutation(data)

      console.log(result)

      // if (!res.data?.signin) {
      //   return message.error("服务器端没有返回任何数据")
      // }
      // const { status, msg, token } = res.data.signin
      // if (status === 20 && token) {
      //   // 状态码为20, 并且有token, 就表示 登录成功
      //   message.success(msg!)
      //   // 保存 token 到 cookies, 无论是否记住密码, 都需要保存 token,
      //   // 记住密码只是为了能回填密码
      //   Cookies.set("token", "Bearer " + token, { expires: tokenExpires })
      //   // 如果这时候 isRemember 为 true, 就保存 用户名和密码
      //   if (isRemember.value) {
      //     setPassword(model)
      //   }
      //   setTimeout(() => {
      //     router.push("/home")
      //   }, 3000)
      //   return
      // } else {
      //   // 没有邮箱, 密码错误, 其他未知错误都走这里
      //   message.error(msg!)
      //   removePassword()
      //   return Cookies.remove("token", { path: "" })
      // }
    }
  })
}
</script>
<template>
  <auth-layout>
    <template #center>
      <login-logo />
      <h2 class="flex md:w-56 lg:w-72 m-4 font-semibold text-lg">登录到工作主页</h2>

      <n-form ref="formRef" :model="model" :rules="rules" size="large" class="flex flex-col md:w-56 lg:w-72">
        <n-form-item-row label="邮箱" path="email">
          <n-input v-model:value="model.email" size="large" placeholder="请输入邮箱" clearable @keydown.enter.prevent />
        </n-form-item-row>

        <n-form-item-row label="密码" path="password">
          <n-input
            v-model:value="model.password"
            type="password"
            show-password-on="mousedown"
            size="large"
            placeholder="请输入密码"
            @keydown.enter.prevent
          >
            <template #password-visible-icon>
              <span class="iconfont icon-password-visible"></span>
            </template>
            <template #password-invisible-icon>
              <span class="iconfont icon-password-not-view"></span>
            </template>
          </n-input>
        </n-form-item-row>

        <dl class="flex items-center justify-between my-2">
          <dd>
            <span class="mr-2">记住密码</span>
            <n-switch v-model:value="isRemember" size="small"></n-switch>
          </dd>
          <router-link to="/forgot-password">
            <label class="cursor-pointer">忘记密码? </label>
          </router-link>
        </dl>

        <n-button size="large" strong secondary type="success" @click="onSubmit"> 登录 </n-button>
      </n-form>

      <p class="flex mt-4 md:w-56 lg:w-72 font-semibold text-base justify-end">
        <span class="mr-2">没有注册?</span>
        <router-link class="text-red-300 cursor-pointer" to="/register"> 注册一个账号 </router-link>
      </p>
    </template>
  </auth-layout>
</template>
