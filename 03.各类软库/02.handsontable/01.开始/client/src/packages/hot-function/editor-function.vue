<script setup lang="ts">
import {} from "vue"
import { HotTable } from "@handsontable/vue3"
import { registerAllModules } from "handsontable/registry"
import "handsontable/dist/handsontable.full.css"
import { CellProperties, GridSettings } from "handsontable/settings"
import Core from "handsontable/core"
import Handsontable from "handsontable"

// register Handsontable's modules
registerAllModules()

class PasswordEditor extends Handsontable.editors.TextEditor {
  override createElements(): void {
    super.createElements()
    super.TEXTAREA = this.hot.rootDocument.createElement("input")
    this.TEXTAREA.setAttribute("type", "password")
    this.TEXTAREA.setAttribute("data-hot-input", "true") // Makes the element recognizable by HOT as its own component's element.
    this.textareaStyle = this.TEXTAREA.style
    this.textareaStyle.width = "0"
    this.textareaStyle.height = "0"

    this.TEXTAREA_PARENT.innerText = ""
    this.TEXTAREA_PARENT.appendChild(this.TEXTAREA)
  }
}

const data = [
  {
    title:
      '<a href="https://www.amazon.com/Professional-JavaScript-Developers-Nicholas-Zakas/dp/1118026691">Professional JavaScript for Web Developers</a>',
    description:
      'This <a href="https://bit.ly/sM1bDf">book</a> provides a developer-level introduction along with more advanced and useful features of <b>JavaScript</b>.',
    comments: "I would rate it &#x2605;&#x2605;&#x2605;&#x2605;&#x2606;",
    cover: "https://handsontable.com/docs/img/examples/professional-javascript-developers-nicholas-zakas.jpg",
  },
  {
    title: '<a href="https://shop.oreilly.com/product/9780596517748.do">JavaScript: The Good Parts</a>',
    description:
      "This book provides a developer-level introduction along with <b>more advanced</b> and useful features of JavaScript.",
    comments: "This is the book about JavaScript",
    cover: "https://handsontable.com/docs/img/examples/javascript-the-good-parts.jpg",
  },
  {
    title: '<a href="https://shop.oreilly.com/product/9780596805531.do">JavaScript: The Definitive Guide</a>',
    description:
      "<em>JavaScript: The Definitive Guide</em> provides a thorough description of the core <b>JavaScript</b> language and both the legacy and standard DOMs implemented in web browsers.",
    comments:
      'I\'ve never actually read it, but the <a href="https://shop.oreilly.com/product/9780596805531.do">comments</a> are highly <strong>positive</strong>.',
    cover: "https://handsontable.com/docs/img/examples/javascript-the-definitive-guide.jpg",
  },
]
const hotSettings: GridSettings = {
  licenseKey: "non-commercial-and-evaluation",
  colHeaders: ["Title", "Description", "Comments", "Cover"],
  colWidths: [200, 200, 200, 80],
  height: "auto",
  columns: [
    { data: "title", renderer: "html" },
    { data: "description", renderer: "html" },
    { data: "comments", renderer: safeHtmlRenderer, editor: PasswordEditor },
    { data: "cover", renderer: coverRenderer },
  ],
}

function safeHtmlRenderer(
  _instance: Core,
  td: HTMLTableCellElement,
  _row: number,
  _col: number,
  _prop: string | number,
  value: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _cellProperties: CellProperties
) {
  // 警告: 必须确保含有 HTML 标签, 防止 XSS 攻击
  td.innerHTML = value
}
function coverRenderer(
  _instance: Core,
  td: HTMLTableCellElement,
  _row: number,
  _col: number,
  _prop: string | number,
  value: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _cellProperties: CellProperties
) {
  const img = document.createElement("img")
  img.src = value

  img.addEventListener("mousedown", (event) => {
    event.preventDefault()
  })

  td.innerText = ""
  td.appendChild(img)

  return td
}
</script>
<template>
  <HotTable :settings="hotSettings" :data="data" />
</template>

<style scoped></style>
