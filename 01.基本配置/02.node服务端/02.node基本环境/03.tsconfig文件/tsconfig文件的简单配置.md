# tsconfig.json 文件的简单配置

tsconfig.json 的位置

```json
|-- index.js
|-- index.ts
|-- server
|   |-- .eslintrc.cjs
|   |-- .esmrc
|-- |-- src
|   |   |-- main.ts
|-- |-- |-- sandbox
|   |   |   |-- sandbox.ts
|-- tsconfig文件的简单配置.md

```

当 tsconfig.json 没有配置时, 运行

```json
node server/index.js  // 会报错 SyntaxError: Cannot use import statement outside a module
node server/index.ts  // 会报错 SyntaxError: Cannot use import statement outside a module

node --loader ts-node/esm server/index.js  // 会报错 SyntaxError: Cannot use import statement outside a module


node -r esm server/index.js
node -r esm server/index.ts

// --loader ts-node/esm 只能针对 ts 文件
node --loader ts-node/esm server/index.ts
// 执行上面的一条命令会出现警告
// ExperimentalWarning: Custom ESM Loaders is an experimental feature and might change at any time
node --no-warnings --loader ts-node/esm server/index.ts
// 执行上面语句警告会消失
```

在 server 目录下执行

```bash
tsc init
```

生成 tsconfig.json 默认文件, 文件放置在 server 目录下.

```json
node --no-warnings --loader ts-node/esm server/index.ts
// 对于运行 index.ts 文件来讲, 没有什么问题的.

node --no-warnings --loader ts-node/esm server/src/main.ts
// 运行 main.ts 也是可以的

```

但是顶层 await 出现了警告.

```txt
仅当 “module” 选项设置为 “es2022”、“esnext”、“system”、“node16” 或 “nodenext”，且 “target” 选项设置为 “es2017” 或更高版本时，才允许使用顶级 “await” 表达式。
```

修改 json 文件.

```json
{
  "target": "esnext" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
  "module": "esnext" /* Specify what module code is generated. */
}
```

还是会出现同样的错误.

```json
node --no-warnings --experimental-specifier-resolution=node --loader ts-node/esm server/src/main.ts
// 这样还是不能执行
```

# 需要指出的是, 这样不能执行是因为 tsconfig.json 的文件放置位置不对

tsconfig.json 文件需要放置在 与 package.json相同的目录下

# 如果有top await 新语法, 直接右键运行也是不行的, 原因是执行目录下找不到 tsconfig 文件



## 同时, 还要加上  "type": "module", 不然也不能执



# <font color=red>能够同时运行新特性和es模块的配置</font>









https://www.bilibili.com/video/BV1rP4y197MD/?spm_id_from=333.337.search-card.all.click&vd_source=a9a0c57b5d0d771fbd9b6bec7ba901ee
