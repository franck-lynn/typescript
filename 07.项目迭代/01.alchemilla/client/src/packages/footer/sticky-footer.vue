<template>
  <span>Copyright © 2022 Franck.lynn. All rights reserved. 林芮应 出品, 联系方式: lry_demry@163.com</span>
</template>

<style scoped>
span {
  right: 0;
  display: block;
  padding-right: 10px;
  width: 0; /* 溢出文字时的处理 */
  height: var(--height-global-footer);
  font-size: 0.8rem;
  border-top: 1px solid #f6f6ff;
  border-top: 1px solid #bbbbc0;
  text-align: right;
  overflow: hidden; /* 溢出文字时的处理 */
  text-overflow: ellipsis; /* 溢出文字时的处理 */
  white-space: nowrap; /* 溢出文字时的处理 */
  color: #7a7676;
  background-color: #ffffff;
  line-height: var(--height-global-footer);
  flex: auto; /* 这个还必须设置才可省略文本 */
  direction: rtl; /* 文本在左侧省略 */
}
</style>
