<script setup lang="ts">
import { ref } from "vue"
import { FormInst, useMessage, FormItemRule, FormRules } from "naive-ui"
import { useRouter } from "vue-router"

import { abouts } from "./register"

const router = useRouter() // 本页面有处理路由跳转

const formRef = ref<FormInst | null>(null)

const message = useMessage()

// 初始时都是空值
const model = ref({
  name: "林芮应",
  email: "lry_demry@163.com",
  password: "123456Aa",
})

// https://github.com/any86/any-rule
const regexpEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
// 密码强度校验，6-18位, 包括至少1个大写字母, 1个小写字母, 1个数字.
const regexpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,18}$/
const rules: FormRules = {
  name: [
    {
      required: true,
      validator: (_rule: FormItemRule, value: string) => {
        if (!value) {
          return new Error("需要用户名")
        }
        return true
      },
      trigger: ["input", "blur"],
    },
  ],
  email: [
    {
      required: true,
      trigger: ["input", "blur"],
      validator: (_rule: FormItemRule, value: string) => {
        if (regexpEmail.test(value)) {
          return true
        } else if (!value) {
          return new Error("需要邮箱")
        } else {
          return new Error("邮箱错误")
        }
      },
    },
  ],
  password: [
    {
      required: true,
      trigger: ["input", "blur"],
      validator: (_rule: FormItemRule, value: string) => {
        if (regexpPassword.test(value)) {
          return true
        } else if (!value) {
          return new Error("需要密码")
        } else {
          return new Error("密码不复合强度校核要求")
        }
      },
    },
  ],
}

// ! register.graphql 会直接生成函数
const onSubmit = (e: MouseEvent) => {
  e.preventDefault()
  // formRef.value?.validate(async (errors) => {
  //   if (errors) {
  //     return message.error("验证失败")
  //   } else {
  //     // 验证成功就走 提交流程
  //     const res = await useSignup.executeMutation({ signupInput: model.value })
  //     if (!res.data?.signup) {
  //       return message.error("服务器端没有返回任何数据")
  //     }
  //     const { status, msg } = res.data!.signup

  //     if (status === 11 || status === 21) {
  //       // 已经注册过了
  //       message.warning(msg!)
  //       setTimeout(() => {
  //         router.push("/login")
  //       }, 3000)
  //       return
  //     }
  //   }
  // })
}
</script>
<template>
  <r3-layout>
    <template #r3-header> <about-header :abouts="abouts" /> </template>

    <template #r3-body>
      <auth-layout>
        <template #center>
          <div class="header flex flex-col md:w-72 lg:w-96 text-lg text-gray-400">
            <span class="iconfont icon-register flex h-24 w-full mb-4 justify-center items-center text-8xl" />
            <h2 class="flex md:w-72 lg:w-96 m-1 font-semibold justify-center items-center text-2xl my-2">
              欢迎您的加入
            </h2>
            <h2 class="flex md:w-72 lg:w-96 items-center text-xl my-4">创建您的账户</h2>
          </div>

          <n-form ref="formRef" :model="model" :rules="rules" size="large" class="flex flex-col md:w-72 lg:w-96">
            <n-form-item-row label="姓名" path="name">
              <n-input
                v-model:value="model.name"
                size="large"
                placeholder="请输入用户名"
                clearable
                @keydown.enter.prevent
              />
            </n-form-item-row>
            <n-form-item-row label="邮箱" path="email">
              <n-input
                v-model:value="model.email"
                size="large"
                placeholder="请输入邮箱"
                clearable
                @keydown.enter.prevent
              />
            </n-form-item-row>
            <n-form-item label="密码" path="password">
              <n-input
                v-model:value="model.password"
                type="password"
                show-password-on="mousedown"
                size="large"
                placeholder="6-18位, 包括至少1个大写字母, 1个小写字母, 1个数字."
                @keydown.enter.prevent
              >
                <template #password-visible-icon>
                  <span class="iconfont icon-password-visible"></span>
                </template>
                <template #password-invisible-icon>
                  <span class="iconfont icon-password-not-view"></span>
                </template>
              </n-input>
            </n-form-item>

            <span class="password-readme">
              <span class="text-sm">确保至少15个字符或至少8个字符(包含数字和小写字母).</span>
              <router-link class="ml-2 cursor-pointer text-red-400" to="/read-more">了解更多.</router-link>
            </span>

            <n-button class="mt-4" size="large" strong secondary type="success" @click="onSubmit">
              创建您的账户
            </n-button>
          </n-form>
        </template>
      </auth-layout>
    </template>

    <template #r3-footer> <sticky-footer /> </template>
  </r3-layout>
</template>

<style scoped></style>
