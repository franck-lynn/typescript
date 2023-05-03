// https://www.bilibili.com/video/BV1rA4y1Z7fd?p=9&vd_source=a9a0c57b5d0d771fbd9b6bec7ba901ee
// https://blog.csdn.net/weixin_41277748/article/details/125029103
// http://www.ruanyifeng.com/blog/2020/08/how-nodejs-use-es6-module.html?ivk_sa=1024320u
// https://zhuanlan.zhihu.com/p/366160581
import obj, { sum, name, topAwait } from "./module/moduleA"

console.log(obj)
console.log(sum)
console.log(name)
console.log(await topAwait())
// Warning: To load an ES module, set "type":
// "module" in the package.json or use the .mjs extension.
