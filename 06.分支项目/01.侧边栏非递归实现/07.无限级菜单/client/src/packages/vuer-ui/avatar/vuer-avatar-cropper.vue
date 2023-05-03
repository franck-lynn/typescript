<script setup lang="ts">
import { ref, reactive } from "vue"
const user = reactive<{ username: string; avatar?: string; nickname?: string }>({
  username: "林芮应",
  // 前端的图片地址
  // avatar: new URL("../../../assets/pic1.jpg", import.meta.url).href,
  // 后端的图片地址
  avatar: "/api/static/img5.jpg",
  // avatar: "http://localhost:3000/img3.jpg",
  nickname: "franck.lynn",
})

const showCropper = ref(false)
const message = ref("ready")

const handleUploading = () => {
  message.value = "uploading..."
}
const handleUploaded = () => {
  console.log()
}
const handleCompleted = () => {
  console.log()
}
const handlerError = () => {
  console.log()
}
</script>
<template>
  <div class="vuer-avatar-cropper">
    <div class="vuer-card-body">
      <div class="vuer-card-pick">
        <img :src="user.avatar!" class="vuer-card-img avatar_img" />
        <div class="vuer-card-img avatar_preview"></div>
        <div class="vuer-card-img-overlay">
          <!-- 点击 button 提交的, 如果没有这个路由就会报错 -->
          <button class="pick-avatar-btn" @click="showCropper = true">Select an new image</button>
        </div>
      </div>
      <div class="vuer-title-muted">
        <span class="vuer-card-title">{{ user.username }}</span>
        <span v-if="user.nickname" class="vuer-text-muted">&nbsp; {{ user.nickname }}</span>
      </div>
    </div>

    <avatar-cropper
      v-model="showCropper"
      upload-url="http://localhost:3000/profiles"
      @uploading="handleUploading"
      @uploaded="handleUploaded"
      @completed="handleCompleted"
      @error="handlerError"
    />
  </div>
</template>

<style scoped>
@import url("scss/main.css");
.vuer-avatar-cropper {
  --width-card: 28rem;
  --height-card: 28rem;
  --width-card-body: calc(0.618 * var(--width-card)); /*  图片宽度 原来设置为 12.25rem */
  --height-card-body: 12.25rem;
  --height-title-muted: 2rem;
  --height-footer: 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto; /* 卡片居中 */
  width: var(--width-card); /* 卡片最大宽度, 没设高低是图片大小不一 */
  box-shadow: 0 0.5em 1em -0.125em #0a0a0a1a, 0 0 0 1px #0a0a0a05;
  flex-direction: column;
}
.vuer-card-body {
  position: relative;
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
  flex-direction: column;
}
.vuer-card-pick {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  & .vuer-card-img {
    max-width: var(--width-card-body);
    border-radius: 4px;
  }
  & .vuer-card-img-overlay {
    /* 选择一个新图像的按钮容器 */
    position: absolute;
    bottom: 0; /*  bottom: var(--height-title-muted); */
    display: none;
    width: 100%;
    transform: translateY(-100%);
    & .pick-avatar-btn {
      /* 选择一个新图像的按钮 */
      width: 100%;
      height: 32px;
      border: 0;
      border-radius: 4px;
      color: #ffffff;
      background-color: #0069d9;
    }
  }
  &:hover {
    & .vuer-card-img-overlay {
      display: block;
    }
  }
}
.vuer-title-muted {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: var(--height-title-muted);
  font-size: 1rem;
}
.vuer-card-footer {
  /* ready  这部分 */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: var(--height-footer);
  background-color: #f9f9f9;
}
</style>
