
# avatar-cropper 图片裁剪显示

### avatar-cropper.vue 文件的关键点

1. 父组件 v-model 绑定了一个 属性 showCropper

​       这个属性在组件中 watch , 一旦点击了 select an new image , 就置为 true, 子组件根据这一数值的变化, 

​       有程序自己点击 pickImage(input框, 子组件是隐藏的), 选择文件, 读取监听等

2. 定义的属性说明

```ts
const props = withDefaults(
  defineProps<{
    modelValue: boolean
    file?: File
    uploadHandler?: (cropper: Cropper) => void // 处理图片上传
    uploadUrl?: string // 上传图片到服务器的路径
    requestOptions?: { method: "POST" | "GET" }
    // 当创建一个 FormData 时, 把 input 框的 file 域 append 到 formData 进行提交
    //  这个 默认值是 input 里定义的 type= "file"
    uploadFileField?: string
    /* 
    上传文件名的几种定义方式
    1. 默认方式是 string, 默认值为 ''
       当 getFilename() 获取文件名时, !props.uploadFileName 的 
       空字符串为 true, 所以走默认的方式.
    2. 当用户传入了一个字符串作为文件名, !props.uploadFileName 就为 false, 
       走 if (typeof props.uploadFileName === "string")
       分支, 获取用户定义的文件名
    3. 当用户定义一个函数时, 走函数 if (typeof props.uploadFileName === "function") 分支
       由函数返回一个文件名
    */
    uploadFileName?:
      | string
      | (({ filename, mime, extension }: { filename: string; mime: string; extension: string | null }) => string)
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
```

