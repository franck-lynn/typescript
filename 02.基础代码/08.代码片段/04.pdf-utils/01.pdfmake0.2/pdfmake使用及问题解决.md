# pdfmake使用及问题解决



1. 字体分析

```font
arial.ttf

```




```ts
// https://github.com/Hopding/pdf-lib
// https://github.com/parallax/jsPDF
// https://github.com/bpampuch/pdfmake
// jsPDF 的一个插件
// https://github.com/simonbengtsson/jsPDF-AutoTable
// 下面这个拟采用
// https://pdfmake.github.io/docs/0.1/document-definition-object/tables/
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import path from "path"
import fs from "fs"
;(async () => {
  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create()
  // Embed the Times Roman font
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

  // Add a blank page to the document
  const page = pdfDoc.addPage()

  // Get the width and height of the page
  const { width, height } = page.getSize()

  // Draw a string of text toward the top of the page
  const fontSize = 30
  page.drawText("Creating PDFs in JavaScript is awesome!", {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  })
  page.drawLine({
    start: { x: 25, y: 75 },
    end: { x: 125, y: 175 },
    thickness: 2,
    color: rgb(0.75, 0.2, 0.2),
  })
  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save()

  /*  填充数据区域 */
  // 写入文件
  const filepath = path.resolve(__dirname, "./aName.pdf")
  // const ab = pdfBytes.buffer
  // const blob = new Blob([ab])
  // console.log(ab)
  // const blob = new Blob([pdfBytes])
  // const file = new File([blob], filepath)
  fs.writeFileSync(filepath, Buffer.from(pdfBytes))
})()
```

# pdfmake 中文加速网站 , 利用 cdn 加速

```html
官方网站 https://www.jsdelivr.com/?query=msyh 对应字体:微软雅黑
https://www.jsdelivr.com/package/npm/china_vfs_fonts_msyh
```

字体生成插件

```html
https://www.jsdelivr.com/package/npm/pdfmake-font-generator
```

其他的字体

arial 字体

```html
https://www.jsdelivr.com/package/npm/pdfmake-arial-unicode
```

如何直接从网站导出?

[pdfmake-fonts CDN by jsDelivr - A CDN for npm and GitHub](https://www.jsdelivr.com/package/npm/pdfmake-fonts)

```ts
<script type="module">
import pdfmakeFonts from 'https://cdn.jsdelivr.net/npm/pdfmake-fonts@0.0.1/+esm'
</script>


<script type="module">
import pdfmakeFontGenerator from 'https://cdn.jsdelivr.net/npm/pdfmake-font-generator@1.0.1/+esm'
</script>


<script src="
https://cdn.jsdelivr.net/npm/pdfmake-with-chinese-fonts@1.0.16/pdfmake.min.js
"></script>
```

pdfmake-chinese

pdfmake 这个库默认不包含中文字体，打包中文字体起来步骤也稍显繁琐，所以这里把打包好的中文字体包放出来，大家下载使用

```ts
<script
  src="
https://cdn.jsdelivr.net/npm/pdfmake-chinese@0.0.8/pdfmake.min.js
"
></script>
```

出现问题

```html
https://github.com/bpampuch/pdfmake/issues/2531
```
