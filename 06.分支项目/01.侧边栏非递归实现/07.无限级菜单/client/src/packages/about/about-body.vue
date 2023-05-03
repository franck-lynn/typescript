<template>
  <about-layout>
    <template #left> <left-image /> </template>

    <template #center>
      <div class="header h-20 md:h-40 text-center font-bold text-4xl md:text-7xl flex items-center justify-center">
        枫调雨顺
      </div>

      <div class="flex flex-col mx-4">
        <h1 class="flex justify-center items-center text-3xl font-bold mb-6">欢迎使用</h1>
        <h2 class="flex justify-center items-center text-2xl mb-12">注册并登录可以使用全部的功能</h2>
        <h3 class="flex justify-start items-center mb-6">
          <span class="iconfont icon-feather text-green-500 text-1xl sm:text-2xl md:text-3xl lg:text-5xl mr-2" />
          轻量级的系统, 安装部署方便
        </h3>
        <h3 class="flex justify-start items-center mb-6">
          <span class="iconfont icon-xin text-red-500 text-1xl sm:text-2xl md:text-3xl lg:text-5xl mr-2" />
          采用最新网络技术, 支持chrome内核如 chrome, edge 等浏览器, 不支持 ie
        </h3>
        <h3 class="flex justify-start items-center">
          <span class="iconfont icon-kuaisugaoxiao text-blue-500 text-1xl sm:text-2xl md:text-3xl lg:text-5xl mr-2" />
          响应快速的用户体验
        </h3>
        <h3 class="flex justify-start items-center mt-6">
          <span
            class="iconfont icon-linghuokuozhan text-yellow-500 text-1xl sm:text-2xl md:text-3xl lg:text-5xl mr-2"
          />
          接口灵活, 提供 restful 和 graphql 接口
        </h3>
      </div>

      <div class="flex items-end font-semibold h-20 text-2xl md:text-3xl lg:text-4xl mx-4">
        <span class="feature">轻 新 快 活</span>
      </div>
      <div class="footer flex justify-center items-end font-semibold h-20 text-3xl">
        横看成岭侧成峰, 远近高低各不同.
      </div>
    </template>

    <template #right> <right-image /> </template>
  </about-layout>
</template>

<style scoped>
@font-face {
  font-family: yyg;
  src: url("../../scss/my-font/yyg.ttf") format("opentype");
  font-display: auto;
}
.header {
  font-family: yyg;
  color: #f153e4;
}
.feature {
  font-family: yyg;
  color: #ee0814;
}
.footer {
  font-family: yyg;
  color: #f153e4;
}
</style>
