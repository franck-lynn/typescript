<script setup lang="ts">
import { ref } from "vue"

import { useMessage } from "naive-ui"

import { ITopRightMenu } from "../../menus/helpers"
withDefaults(
  defineProps<{
    options?: ITopRightMenu[]
    langs?: ITopRightMenu[]
    custom?: ITopRightMenu[]
    badge?: number
  }>(),
  {
    options: () => [
      { label: "合同状态", key: "contract" },
      { label: "发货单号", key: "shipping" },
      { label: "快递查询", key: "express" },
    ],
    langs: () => [
      { label: "简体中文", key: "zh-cn" },
      { label: "英文", key: "en" },
    ],
    custom: () => [
      { label: "个人主页", key: "profile" },
      { label: "用户设置", key: "user-settings" },
      { label: "退出", key: "destroy-user" },
    ],
    badge: 8,
  }
)

const message = useMessage()
const handleLang = (key: string | number) => {
  message.info(String(key))
}
const handleCustom = (key: string | number) => {
  message.info("用户资料点击--> " + String(key))
}
const username = ref<string>("林芮应")

const src = "/images/pic2.jpg"
</script>
<template>
  <n-space justify="end" :size="0">
    <n-dropdown :options="options" placement="bottom-end" size="huge">
      <n-button quaternary circle type="primary" size="large">
        <template #icon>
          <span class="icon-badge">
            <span class="iconfont icon-custom-status"></span>
            <span v-if="!!badge" class="badge">{{ badge }}</span>
          </span>
        </template>
      </n-button>
    </n-dropdown>
    <n-dropdown :options="langs" placement="bottom-end" size="huge" @select="handleLang">
      <n-button quaternary circle type="primary" size="large">
        <template #icon>
          <span class="iconfont icon-global"></span>
        </template>
      </n-button>
    </n-dropdown>
    <n-dropdown :options="custom" placement="bottom-end" size="huge" bordered="false" @select="handleCustom">
      <n-button quaternary circle type="primary" size="large">
        <vuer-avatar :username="username" :src="src" rounded="50%"></vuer-avatar>
      </n-button>
    </n-dropdown>
  </n-space>
</template>

<style scoped>
.n-space {
  --background-color-badge: #ff6c60;
  --icon-font-size: 30px;

  display: flex;
  align-items: center;
  height: var(--height-top-nav);
  background-color: #eeeeee;
  & .n-button {
    border: none;
    outline: none;
  }
  & .iconfont {
    font-size: var(--icon-font-size);
  }
  & .icon-badge {
    position: relative;
    & .badge {
      position: absolute;
      top: -3px;
      left: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: calc(0.7 * var(--icon-font-size));
      height: calc(0.7 * var(--icon-font-size));
      font-size: 12px;
      border-radius: 50%;
      color: #ffffff;
      background-color: var(--background-color-badge);
    }
  }
}
</style>
