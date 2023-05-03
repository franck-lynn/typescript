<script setup lang="ts">
// https://pdfmake.github.io/docs/0.1/getting-started/client-side/
// 表明导入的时候应该用 pdfMake, 不应该是 pdfmake
import { ref } from "vue"

import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs

pdfMake.fonts = {
  // 下面这个网站 CDN 是专门用于给 pdkmake 加速的中文字体
  // https://www.jsdelivr.com/?query=msyh
  // 先按照官方网站介绍的方法进行使用
  // https://pdfmake.github.io/docs/0.1/fonts/custom-fonts-client-side/url/
  // 即使是只有一个常规字体, 也要4个都包含进来.
  // 打开网站, 可以看到, 有一个 ["msyh.ttf"] 的字体文件
  // 还要清楚浏览器缓存才能看到 msyh 字体的加载
  // msyh: {
  //   normal: "https://cdn.jsdelivr.net/npm/china_vfs_fonts_msyh@1.0.0/index.min.js",
  //   bold: "https://cdn.jsdelivr.net/npm/china_vfs_fonts_msyh@1.0.0/index.min.js",
  //   italics: "https://cdn.jsdelivr.net/npm/china_vfs_fonts_msyh@1.0.0/index.min.js",
  //   bolditalics: "https://cdn.jsdelivr.net/npm/china_vfs_fonts_msyh@1.0.0/index.min.js",
  // },
  msyh: {
    normal: "msyh.ttf",
    bold: "msyh.ttf",
    italics: "msyh.ttf",
    bolditalics: "msyh.ttf",
  },

  Roboto: {
    // normal: "Roboto-Regular.ttf",
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf",
  },
}

console.log(pdfMake.vfs["msyh.ttf"])

const url = ref()

function generdatePdf() {
  const dd = {
    pageMargins: [40, 40, 40, 100],
    footer: function (currentPage: number, pageCount: number) {
      // 页脚的设置
      return {
        table: {
          body: [
            //
            [
              {
                text: `page ${currentPage} of ${pageCount}`,
                aligment: "right", //
                style: "normalText",
                margin: [0, 20, 50, 0],
              },
            ],
          ],
        },
        // 取消边框在 table 的同级
        layout: "noBorders",
      }
    },
    content: [
      // pageBreak: after 表示分页
      { text: "中文第1页", pageBreak: "after", style: { normal: true } }, //
      { text: "Second page of Document", pageBreak: "after" },
      { text: "Third page of Document", pageBreak: "after" },
      // 最后一行不用分页
      { text: "Fourth page of Document" },
    ],
    defaultStyle: {
      font: "msyh.ttf",
      // normal: "msyh.ttf",
      // bolditalics: "msyh.ttf",
      // bold: "msyh.ttf",
      // italics: "msyh.ttf",
    },
  }
  // @ts-ignore
  // pdfMake.createPdf(dd).download()

  // @ts-ignore
  const pdfGenerator = pdfMake.createPdf(dd)
  pdfGenerator.getBlob((blob) => {
    url.value = URL.createObjectURL(blob)
  })
}
</script>
<template>
  <n-button @click="generdatePdf"> 生成pdf 文档</n-button>

  <div>{{ url }}</div>
</template>

<style scoped></style>
