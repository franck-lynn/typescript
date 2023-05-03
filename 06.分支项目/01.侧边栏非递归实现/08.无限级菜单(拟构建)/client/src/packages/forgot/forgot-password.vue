<script setup lang="ts">
import {} from "vue"

const abouts = [
  { to: "/index", icon: "icon-home", title: "返回首页" },
  { to: "/register", icon: "icon-register", title: "注册" },
]

// 忘记密码的下一步是 发送邮件, 当有这个邮箱时才发送
import { FormInst, FormItemRule, useMessage } from "naive-ui"
import { ref } from "vue"
import { useRouter } from "vue-router"

// 滑动验证码需要购买

const message = useMessage()

const formRefEmail = ref<FormInst | null>()

const regexpEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
// 定义邮箱变量, v-model 双向绑定
interface ModelType {
  email?: string
  mobile?: string
}
const model = ref<ModelType>({
  email: "lry_demry@163.com",
  mobile: "",
})

// n-form-item-row 上绑定验证规则
const ruleEmail: FormItemRule = {
  required: true,
  trigger: ["input", "blur"],
  validator: () => {
    if (!model.value.email || model.value.email === "") {
      return new Error("请输入邮箱")
    }
    if (!regexpEmail.test(model.value.email)) {
      return new Error("邮箱格式不正确")
    }
  },
}
// 提交数据到服务器
// 步骤:
// 1. 在服务器端定义模式文件 user.schema.gql
// 2. 在 user.resolver.ts 文件里定义解析器

// const useHasEmail = useHasEmailMutation()
const router = useRouter()

const hasEmail = async (e: MouseEvent) => {
  e.preventDefault()
  // const messageReactive = message.loading('提交中', {duration: 0})
  const email = model.value.email
  if (!email) return
  // 发送请求到到服务器
  formRefEmail.value?.validate(async (error) => {
    if (!error) {
      const res = await useHasEmail.executeMutation({ email })
      const result = res.data?.hasEmail
      // message.info("发送的数据是, 服务器端返回的---> " + JSON.stringify(result))
      console.log(JSON.stringify(result))
      if (!result) {
        return message.error("没有此邮箱")
      }
      const { status, msg } = result
      if (status === 20 && msg) {
        router.push("/mail-sending")
      } else {
        return message.error("未知错误")
      }
    } else {
      message.error("邮箱有错误, 在客户端就不能提交")
    }
    // messageReactive.destroy()
  })
}
</script>
<template>
  <r3-layout>
    <template #r3-header> <about-header :abouts="abouts" /> </template>

    <template #r3-body>
      <auth-layout>
        <template #center>
          <n-card class="flex w-3/4 h-64 shadow rounded-lg">
            <n-tabs class="card-tabs" default-value="passwordResetByEmail" size="large" animated>
              <n-tab-pane name="passwordResetByEmail" tab="邮箱账号">
                <n-form ref="formRefEmail" :model="model">
                  <n-form-item-row :rule="ruleEmail" path="email" label="请输入要重置密码的邮箱账号">
                    <n-input v-model:value="model.email" type="text" size="large" placeholder="请输入邮箱" />
                  </n-form-item-row>
                </n-form>
                <n-button type="primary" block secondary strong @click="hasEmail"> 下一步 </n-button>
              </n-tab-pane>

              <n-tab-pane name="passwordResetByMobile" tab="手机账号">
                <n-form ref="formRefMobile" :model="model">
                  <n-form-item-row rule-mobile="" path="" label="请输入要重置密码的手机账号">
                    <n-input v-model:value="model.mobile" type="text" size="large" placeholder="请输入手机号码" />
                  </n-form-item-row>
                </n-form>
                <n-button type="primary" block secondary strong> 下一步 </n-button>

                <n-button
                  class="flex mt-2 mr-2 justify-end items-end text-sm"
                  text
                  tag="a"
                  href="/password-reset"
                  type="primary"
                >
                  该手机号码无法使用?
                </n-button>
              </n-tab-pane>
            </n-tabs>
          </n-card>

          <n-message-provider></n-message-provider>
        </template>
      </auth-layout>
    </template>

    <template #r3-footer> <sticky-footer /> </template>
  </r3-layout>
</template>

<style scoped></style>
