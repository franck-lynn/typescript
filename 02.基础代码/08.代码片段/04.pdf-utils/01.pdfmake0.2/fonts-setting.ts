import path from "path"
// 在服务器端对本地字体位置进行设置
export const fonts = {
  // 服务器端使用字体
  // 需要 ttf, 还是 ttc, ttc 是多种字体的合集, 需要第二个参数给出
  // https://github.com/foliojs/pdfkit/issues/706
  // 这个 issue 解决了YaHei的问题
  // 如何查看字体名称, 可以使用 FontCreator9.0 这个小工具, 打开看看 simsum.ttc, 可以看到, 有
  // 2个字体名称, 宋体 simsun_0.ttf 和 新宋体 simsun_1.ttf,
  // 需要查看真实的字体名称才可以,
  SimSum: {
    // ttc 里的宋体
    normal: [path.resolve(__dirname, "../fonts/simsun/simsun.ttc"), "SimSun"],
    bold: [path.resolve(__dirname, "../fonts/simsun/simsun.ttc"), "SimSun"],
    italics: [path.resolve(__dirname, "../fonts/simsun/simsun.ttc"), "SimSun"],
    bolditalics: [path.resolve(__dirname, "../fonts/simsun/simsun.ttc"), "SimSun"],
  },
  // ttc 里的 新宋体
  NSimSum: {
    normal: [path.resolve(__dirname, "../fonts/simsun/simsun.ttc"), "NSimSun"],
    bold: [path.resolve(__dirname, "../fonts/simsun/simsun.ttc"), "NSimSun"],
    italics: [path.resolve(__dirname, "../fonts/simsun/simsun.ttc"), "NSimSun"],
    bolditalics: [path.resolve(__dirname, "../fonts/simsun/simsun.ttc"), "NSimSun"],
  },
  // 注意, 这里是 ttf, 不是 ttc 字体
  // msyh: {
  //   normal: path.resolve(__dirname, "../fonts/msyh/msyh.ttf"),
  //   bold: path.resolve(__dirname, "../fonts/msyh/msyh.ttf"),
  //   italics: path.resolve(__dirname, "../fonts/msyh/msyh.ttf"),
  //   bolditalics: path.resolve(__dirname, "../fonts/msyh/msyh.ttf"),
  // },

  // 这是使用 FontCreator9.0 这个小工具展开字体后可以使用
  // msyh: {
  //   normal: path.resolve(__dirname, "../fonts/msyh/msyh_0.ttf"),
  //   bold: path.resolve(__dirname, "../fonts/msyh/msyh_0.ttf"),
  //   italics: path.resolve(__dirname, "../fonts/msyh/msyh_0.ttf"),
  //   bolditalics: path.resolve(__dirname, "../fonts/msyh/msyh_0.ttf"),
  // },
  // 如果直接使用 msyh.ttc 呢,  需要传2个参数, 但是, 如果获取对应字体的名称呢?
  // 在 https://fontforge.org/en-US/downloads/windows-dl/ 这个网址直接下载
  // window 的安装版进行查看, 或者下载免安装版, 不过, 这里查出来的名字中间不能
  // 有空格, 很奇怪的
  msyh: {
    normal: [path.resolve(__dirname, "../fonts/msyh/msyh.ttc"), "MicrosoftYaHei"],
    bold: [path.resolve(__dirname, "../fonts/msyh/msyh.ttc"), "MicrosoftYaHeiUI"],
    italics: [path.resolve(__dirname, "../fonts/msyh/msyh.ttc"), "MicrosoftYaHei"],
    bolditalics: [path.resolve(__dirname, "../fonts/msyh/msyh.ttc"), "MicrosoftYaHeiUI"],
  },
  // 这是系统默认的字体
  Roboto: {
    normal: path.resolve(__dirname, "../fonts/Roboto/Roboto-Regular.ttf"),
    bold: path.resolve(__dirname, "../fonts/Roboto/Roboto-Medium.ttf"),
    italics: path.resolve(__dirname, "../fonts/Roboto/Roboto-Medium.ttf"),
    bolditalics: path.resolve(__dirname, "../fonts/Roboto/Roboto-MediumItalic.ttf"),
  },
}
