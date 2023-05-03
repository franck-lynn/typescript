<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue-demi"
import Cropper from "cropperjs"
import "cropperjs/dist/cropper.css"
import mime from "mime/lite"

type uploadFileNameFunction = ({
  filename,
  extension,
}: {
  filename: string
  extension: string | undefined | null
}) => string

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    file?: File
    uploadHandler?: (cropper: Cropper) => void // 处理图片上传
    uploadUrl?: string // 上传图片到服务器的路径
    requestOptions?: { method: "POST" | "GET" }
    uploadFileField?: string
    uploadFileName?: string | uploadFileNameFunction
    uploadFormData?: FormData
    cropprtOptions?: Cropper.Options
    outputOptions?: Cropper.GetCroppedCanvasOptions | undefined
    outputMime?: string
    outputQuality?: number
    mimes?: string
    capture?: boolean
    labels?: { submit: string; cancel: string }
    inline?: boolean
  }>(),
  {
    modelValue: false,
    file: undefined,
    uploadHandler: undefined,
    uploadUrl: "",
    requestOptions: () => ({ method: "POST" }),
    uploadFileField: "file",
    uploadFileName: "",
    uploadFormData: () => new FormData(),
    cropprtOptions: () => ({
      aspectRatio: 1,
      autoCropArea: 1,
      viewMode: 1,
      movable: false,
      zoomable: false,
    }),
    // https://github.com/fengyuanchen/cropperjs
    // 由 getCroppedCanvas([options]) 部分定义
    outputOptions: undefined,
    outputMime: "",
    outputQuality: 0.9,
    mimes: "image/png, image/gif, image/jpeg, image/bmp, image/x-icon",
    // capture: false,
    labels: () => ({ submit: "Ok", cancel: "Cancel" }),
    inline: false,
  }
)
const emits = defineEmits<{
  (e: "update:modelValue", agrs1: boolean): void
  (e: "submit"): void
  (e: "error", agrs1: { type: string; message: string; context?: { request: Request; response: Response } }): void
  (e: "cancel"): void
  (e: "changed", agrs1: { file: File; reader: FileReader }): void
  (e: "uploading", agrs1: { form: FormData; request: Request; response: Promise<Response> }): void
  (e: "completed", agrs1: { form: FormData; request: Request; response: Response }): void
  (e: "uploaded", agrs1: { form: FormData; request: Request; response: Response }): void
}>()
const input = ref<HTMLInputElement | null | undefined>()
const img = ref<HTMLImageElement | null | undefined>()
const cropper = ref<Cropper | undefined>()
const dataUrl = ref<string>()
const filename = ref<string>("")
const mimeType = ref<string>()

const cleanedMimes = computed(() => {
  if (!props.mimes) throw new Error("vue-avatar-cropper: mimes prop cannot be empty")
  return props.mimes.trim().toLowerCase()
})

const cancel = () => {
  emits("cancel")
  destory()
}
const createCropper = () => {
  // 当 input 读取文件, 设置了 dataUrl 后会触发 image 的 load, 执行 createCropper
  if (!img.value) return
  cropper.value = new Cropper(img.value, props.cropprtOptions)
}
const onImgElementError = () => {
  emits("error", { type: "load", message: "File loading failed" })
  destory()
}
const submit = () => {
  emits("submit")
  if (props.uploadUrl) {
    uploadImage()
  } else if (props.uploadHandler && cropper.value) {
    props.uploadHandler(cropper.value)
  } else {
    emits("error", { type: "user", message: "No upload handler found" })
  }
}
const onFileInputChange = (e: Event) => {
  if (!e.target) return
  const files: FileList | null = (e.target as HTMLInputElement).files
  if (!files) return
  const file: File | undefined = files[0]
  if (!file) return
  onFileChange(file)
}

onMounted(() => {
  emits("update:modelValue", false)
})
watch(
  () => props.modelValue,
  (value) => {
    if (!value) return
    if (props.file) {
      onFileChange(props.file)
    } else {
      pickImage()
    }
    emits("update:modelValue", false)
  }
)

function pickImage() {
  if (input.value) {
    input.value.click() // 让机器点击一下 input 框
  }
}

function onFileChange(file: File) {
  // https://github.com/overtrue/vue-avatar-cropper/blob/master/src/AvatarCropper.vue
  const filetypePrefix = file.type.split("/")[0]
  if (filetypePrefix !== "image") {
    emits("error", { type: "user", message: "File type not correct" })
    return
  }
  const hasCorrectType = cleanedMimes.value.split(",").find((mime) => mime.trim() === file.type.trim())
  if (!hasCorrectType) {
    emits("error", { type: "user", message: "File type not correct" })
    return
  }
  // console.log("有正确的文件类型", hasCorrectType) // 有正确的文件类型  image/jpeg
  const reader = new FileReader()
  reader.onload = (e: ProgressEvent<FileReader>) => {
    if (e.target && e.target.result) dataUrl.value = String(e.target.result) // 由base64编码的图片
  }
  reader.readAsDataURL(file) // 读取器读取这个文件
  filename.value = file.name || "unknown" // 读取的文件名
  mimeType.value = file.type //  文件的类型, 例如: image/jpeg
  emits("changed", { file, reader })
}

function destory() {
  if (cropper.value) cropper.value.destroy()
  if (input.value) input.value.value = ""
  dataUrl.value = undefined
}

function uploadImage() {
  if (!cropper.value) {
    emits("error", { type: "user", message: "Cropper none, File cannot upload." })
    return
  }
  cropper.value.getCroppedCanvas(props.outputOptions).toBlob(
    async (blob) => {
      const form = new FormData()
      for (const [key, value] of props.uploadFormData.entries()) {
        form.append(key, value)
      }
      // append() 里的参数含义分别是:
      // 1. props.uploadFileField = file
      // 2. blob = Blob{size: 1004680, type: 'image/png'}
      // 3. filename=001.png
      if (blob) form.append(props.uploadFileField, blob, getFilename(blob))
      // 准备好提交的数据
      const requestOptions = Object.assign({ body: form }, props.requestOptions)
      const request = new Request(props.uploadUrl, requestOptions)

      const reqPromise = fetch(request)

      emits("uploading", { form, request, response: reqPromise })
      const response = await reqPromise
      emits("completed", { form, request, response })
      if (response.ok) {
        emits("uploaded", { form, request, response })
      } else {
        emits("error", { type: "upload", message: "Image upload fail", context: { request, response } })
      }
    },
    // 还有2个参数
    props.outputMime || mimeType.value,
    props.outputQuality
  )
}

function getFilename(blob: Blob) {
  const extension = mime.getExtension(blob.type)
  // 默认逻辑
  if (!props.uploadFileName) {
    let actualFilename = filename.value
    const filenameParts = filename.value.split(".")
    if (filenameParts.length > 1) {
      actualFilename = filenameParts.slice(0, -1).join(".")
      return `${actualFilename}.${extension}`
    }
  }
  // 用户提供的名称
  if (typeof props.uploadFileName === "string") {
    return props.uploadFileName
  }
  if (typeof props.uploadFileName === "function") {
    return props.uploadFileName({
      filename: filename.value,
      extension,
    })
  }
  return `unknown.${extension}`
}
</script>
<template>
  <div class="avatar-cropper">
    <div v-if="dataUrl" class="avatar-cropper-overlay" :class="{ 'avatar-cropper-overlay-inline': inline }">
      <div v-if="!inline" class="avatar-cropper-mark">
        <a class="avatar-cropper-close" :title="labels!.cancel" href="javascript:;" @click="cancel"> &times; </a>
      </div>
      <div class="avatar-cropper-container">
        <div class="avatar-cropper-image-container">
          <img ref="img" :src="dataUrl" alt="picture" @load.stop="createCropper" @error="onImgElementError" />
        </div>
        <div class="avatar-cropper-footer">
          <button class="avatar-cropper-btn" @click.stop.prevent="cancel">
            {{ labels!.cancel }}
          </button>

          <button class="avatar-cropper-btn" @click.stop.prevent="submit">
            {{ labels!.submit }}
          </button>
        </div>
      </div>
    </div>
    <input
      v-if="!file"
      ref="input"
      :accept="cleanedMimes"
      :capture="capture"
      class="avatar-cropper-img-input"
      type="file"
      @change="onFileInputChange"
    />
  </div>
</template>

<style scoped>
.avatar-cropper {
  & .avatar-cropper-overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  & .avatar-cropper-overlay-inline {
    position: initial;
  }
  & .avatar-cropper-img-input {
    display: none;
  }
  & .avatar-cropper-close {
    float: right;
    padding: 20px;
    font-size: 3rem;
    font-weight: 100;
    color: #ffffff;
    text-shadow: 0 1px rgb(40 40 40 / 30%);
  }
  & .avatar-cropper-mark {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgb(0 0 0 / 10%);
  }
  & .avatar-cropper-container {
    z-index: 999;
    background: #ffffff;
    box-shadow: 1px 1px 5px rgb(100 100 100 / 14%);
    & .avatar-cropper-image-container {
      position: relative;
      max-width: 400px;
      height: 300px;
    }
    & img {
      max-width: 100%;
      height: 100%;
    }
    & .avatar-cropper-footer {
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      align-content: stretch;
      & .avatar-cropper-btn {
        padding: 15px 0;
        width: 50%;
        border: none;
        background: transparent;
        outline: none;
        cursor: pointer;
        &:hover {
          color: #ffffff;
          background-color: #2aabd2;
        }
      }
    }
  }
}
</style>
