# ts 模块系统

无论是js还是ts. 都是以一个文件作为模块最小单元

任何一个包含 import 或 export 文件都被当成一个模块

相反, 不含 import 或 export 就是全局可见的.假设定义2个文件,  global1.ts和 global2.ts

```ts
// global1.ts
const a1 = 100
const a2 = 200
```

```ts
// global2.ts
const a1 = 200  // 无法重新声明块范围变量“a1”。
```

就会报 **无法重新声明块范围变量“a1”。** 错误.  只要有导出语法, 就不会出现这个错误了

```ts
// global1.ts
const a1 = 100
const a2 = 200
export { a1, a2 }
```

```ts
// global2.ts
const a1 = 200
export { a1 }
```

模块编译

在 ts 编译选项中(tsconfig.json中配置),  module 选项是用来指定生成哪个模块系统的代码的, 可设置值有:

```txt
none
commonjs
amd
udm
es6/es2015/esnext
System
target="es3" or "es5", 默认使用 commonjs.其他情况默认es6
```

新建 server/src/module/moduleA.ts

```ts
export function sum(a: number, b: number) {
  return a + b
}
export const name = "浙江杭州"

export default {
  name: "浙江杭州",
  subtract: (a: number, b: number) => a - b,
}

export const topAwait = async () => {
  return "new Promise()"
}

```

在 server/src/main.ts 文件中

```ts
import obj, { sum, name /* , topAwait */ } from "./module/moduleA"

console.log(obj)
console.log(sum)
console.log(name)
// console.log(await topAwait())
```

配置 tsconfig.json, 这时还没配置 package.json

```json
{
  "compilerOptions": {
    "outDir": "./dist", // 编译后的文件目录
    "target": "ES3" // 编译后的文件的目标版本
  },
  "include": ["server/src/**/*"]
}
```

在 PS ...\02.ts中的模块化> 目录下执行

```bash
tsc 
```

就会编译 server/src 下的所有目录

例如. main.ts 会编译成 

```js
"use strict";
exports.__esModule = true;
var moduleA_1 = require("./module/moduleA");
console.log(moduleA_1["default"]);
console.log(moduleA_1.sum);
console.log(moduleA_1.name);
// console.log(await topAwait())
```

如果改成 es6的目标文件.

```json
{
  "compilerOptions": {
    "outDir": "./dist", // 编译后的文件目录
    "target": "ES6" // 编译后的文件的目标版本
  },
  "include": ["server/src/**/*"]
}
```

会报如下错误:

```bash
Cannot find module './lib/json-transport'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?
```

修改 tsconfig.json

```json
{
  "compilerOptions": {
    "outDir": "./dist", // 编译后的文件目录
    "target": "ES6", // 编译后的文件的目标版本
    "moduleResolution": "node"
  },

  "include": ["server/src/**/*"]
}
```

编译成功,  输出的文件是 es6 的形式, 

```json
{
    "moduleResolution": "node" // 是按照 node 模块加载器的模式编译代码,
}
```

但是, 编译的代码却不能运行, 报 

```bash
import obj, { sum, name /* , topAwait */ } from "./module/moduleA";
SyntaxError: Cannot use import statement outside a module
```

这说明加载文件的方式 node 是 commonjs 的方式, esm 模式下并不能运行

如果在 tsconfig.json 中修改如下, 加上 "module": "esnext", 也不能运行, 

```json
{
  "compilerOptions": {
    "outDir": "./dist", // 编译后的文件目录
    "target": "ES6", // 编译后的文件的目标版本
    "module": "esnext", // 配置编译目标使用的模块化标准
    "moduleResolution": "node" // 按照 node 模块加载器的方式导入导出
  },

  "include": ["server/src/**/*"]
}

```

tsconfig.json 里的设置含义

```json
{
  "compilerOptions": {
    "outDir": "./dist", // 编译后的文件目录
    "target": "ES6", // 编译后的文件的目标版本
    "module": "esnext", // 配置编译目标使用的模块化标准
    "allowJs": true, // 可以导入第3方的 js 文件
    // 使用 module.exports = xxx 这样的导出的文件
    // 运行从没有设置默认导出的模块中默认导入,
    "allowSyntheticDefaultImports": true,
    // 上面这行虽然可以解决编译过程中的检测问题, 但是, 编译后的具体要运行
    // 的代码还是有问题的, 还要加上
    // 则在编译的同时, 生成一个 __importDefault 函数, 用来处理具体的 default
    // 默认导出.
    // 注意, 以上设置只能是 module 不为 es6+ 的情况下有效.如果是 es6+ 则不需要
    // 这样麻烦.
    "esModuleInterop": true,
    "resolveJsonModule": true, // 可以导入json
    "moduleResolution": "node" // 按照 node 模块加载器的方式导入导出
  },

  "include": ["server/src/**/*"]
}
```





```json
{
  // https://zhuanlan.zhihu.com/p/505649091
  // https://www.typescriptlang.org/zh/tsconfig
  "compilerOptions": {
    // 编译选项
    // form.entries(), form 表单定义了 entries 接口, 但报错没有定义 entries(), 所以加上 DOM.Iterable
    "lib": ["esnext", "DOM", "DOM.Iterable"], // 指定项目中用到的库. ts 包含一组内建的库, 这些库定义了一些类型接口, 可以直接拿来使用
    "moduleResolution": "node", // 指定模块解析策略, 不用这个的话, import vue from 'vue' 会提示找不到模块
    // "allowUnreachableCode": false, // 不可到达的代码检查, false 表示不允许. 这个在 eslint 中也可以检查
    // "allowUnusedLabels": false, // 是否允许没有使用的变量, false 表示不允许
    "strict": true, // 开启所有严格的类型检查
    "removeComments": true,
    // **********************模块部分**************************
    "baseUrl": "./", // 意思是导入模块时, 可以少写 ../ 或者 ./
    "target": "esnext", // 指定 ts 被编译成的版本
    // 指定要使用的模块化的规范, 如果出现导入 es6 模块错误, 改成 commonjs 模块
    // 前端导出的是 commonjs 模块, 引用 es6 模块可能会出现这种情况
    "module": "ESNext",
    "resolveJsonModule": true, // 可以解析 json 文件
    "esModuleInterop": true,
    "paths": {
      // 如果指定 paths 模块, 则 baseUrl 必须要指定, 这样, 在导入时
      // import ??? from 'component/???' 就不报错了, 与 vite 里的别名不同
      // 这里指定了, vite 里面还要指定
      "typings/*": ["./src/typings/*"], // 相对路径, 如果不设置 baseUrl, 则要加 ./, 如: typings/*": ["./src/typings/*"],
      // "~/*": ["F:/node/node_modules/"], // post css 用这个不行
      "@/*": ["./src/*"], // ./src/*要加个 *
      "components/*": ["./src/components"],
      "packages/*": ["./src/packages"],
      "scss/*": ["./src/scss/"]
    },
    "allowSyntheticDefaultImports": true,
    // "typeRoots": [], // 类型根路径, 默认情况下，所有 可见 的 ”@types” 包都将包含在你的编译过程中, 在 node_modules/@types 中的任何包都被认为是 可见 的
    // types: [] // 默认情况下，所有 可见 的 ”@types” 包都将包含在你的编译过程中
    // import.meta.glob 会报 没有 glob 属性错误,
    // component: () => import("@/packages/about/index.vue") 会报不是模块错误,加上 "types": ["vite/client"], 解决这个问题
    // https://futurestud.io/tutorials/vite-resolve-import-meta-glob-in-typescript
    "types": ["vite/client"],
    // **********************Emit部分**************************
    "noEmit": true, // 禁止编译器生成文件，例如 JavaScript 代码，source-map 或声明
    // **********************JavaScript Support部分**************************
    "allowJs": true, // 引入(import) js 到 ts 不会报错
    "checkJs": true, // 与 allowJs 配合使用,当 checkJs 被启用时,JavaScript 文件中会报告错误, 当于在项目中所有 JavaScript 文件顶部包含 // @ts-check

    // **********************类型检查部分**************************
    // https://zhuanlan.zhihu.com/p/505649091
    "exactOptionalPropertyTypes": false, // 为 true 时, 在接口中定义可选属性时不能被赋值为 undefined
    "noFallthroughCasesInSwitch": true, // 不允许 switch 表达式中存在贯穿, 即要 break 或者 return
    "noImplicitAny": false, // typescript 会提供一个兜底类型 any 给那些没有声明类型且无法推断出类型的属性
    "noImplicitOverride": true, // 当子类重写父类方法时，需要在重写的方法前添加 override, 否则报错
    // "noImplicitReturns": true, // 禁止代码块有不明确的返回值.true: 禁止; false: 忽略
    // "noImplicitThis": true, 禁止函数内部使用没有明确类型的this, true: 禁止; false: 忽略
    "noPropertyAccessFromIndexSignature": true, // 访问索引签名定义的属性，以便提醒使用者该属性不一定存在
    "strictPropertyInitialization": true, // 检查类属性是否需要初始化
    "useUnknownInCatchVariables": true, // 为 true ，catch 块中的 error 参数类型设置为 unknown, 要使用 e.message, 就必须指定类型
    "noUncheckedIndexedAccess": true, // 为 true 时，当使用索引属性时，会默认为索引属性添加`undefined`属性值
    "noUnusedLocals": true, // 为 true 时，当存在未使用的局部变量时，会抛出错误
    "noUnusedParameters": true, // 为 true 时，当存在未使用的参数时，会抛出错误
    "strictBindCallApply": true, // 为 true ，当使用`call`、`bind`、`apply`调用函数时，提供正确的类型检查
    "strictFunctionTypes": true, // 为 true ，对函数参数类型严格把控
    "strictNullChecks": true // 为 true ，对`null` 和 `undefined` 类型严格把控
    // **********************跳过库检查 **************************
    // "skipLibCheck": true
  },
  "outDir": "/", // 输出目录, 指定编译后的js 文件所在目录
  "include": ["src/**/*", "../test/test-backup/test-apollo-send-data-copy.vue.ts"], // 哪些 ts 文件需要编译, src 目录及子目录下的所有文件需要编译
  "exclude": ["node_modules"] // 要排除的文件的目录, 这个目录下的文件不编译
}

```



```json
{
    "rootDir": "./", // 当前要编译的文件夹
    "outDir": "./dist", // 编译后的文件目录
}
```



