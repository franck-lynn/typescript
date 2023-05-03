# es6 模块化的执行

目前的 es module 解析并不支持 CommonJS 加载器的所有默认行为。其中一个行为差异是文件扩展名的自动解析以及自动导入一个目录下 index 文件的的能力。

--experimental-specifier-resolution=[mode]标志可以用来定制扩展名解析算法。

默认模式是 `explicit` 的，它要求向加载器提供一个模块的完整路径。要启用自动扩展解析并从自动导入目录下的 index 文件，请使用 `node` 模式。

```json
 "scripts": {
    "server": "nodemon -x node --no-warnings --experimental-specifier-resolution=node --loader ts-node/esm server/src/main.ts --watch server/src "
  },
```

所以你可以这样执行代码

```bash
npm run server
```

运行 nodemon --help 得到如下的提示:

```bash
nodemon --help
  Usage: nodemon [options] [script.js] [args]

  Options:

  --config file ............ alternate nodemon.json config file to use
  -e, --ext ................ extensions to look for, ie. js,pug,hbs.
  -x, --exec app ........... execute script with "app", ie. -x "python -v".
  -w, --watch path ......... watch directory "path" or files. use once for
                             each directory or file to watch.
  -i, --ignore ............. ignore specific files or directories.
  -V, --verbose ............ show detail on what is causing restarts.
  -- <your args> ........... to tell nodemon stop slurping arguments.

  Note: if the script is omitted, nodemon will try to read "main" from
  package.json and without a nodemon.json, nodemon will monitor .js, .mjs, .coffee,
  .litcoffee, and .json by default.

  For advanced nodemon configuration use nodemon.json: nodemon --help config
  See also the sample: https://github.com/remy/nodemon/wiki/Sample-nodemon.json

  Examples:

  $ nodemon server.js
  $ nodemon -w ../foo server.js apparg1 apparg2
  $ nodemon --exec python app.py
  $ nodemon --exec "make build" -e "styl hbs"
  $ nodemon app.js -- --config # pass config to app.js

  All options are documented under: nodemon --help options
```

### 原生 ECMAScript 模块

[ ts-node ](https://gitcode.net/mirrors/TypeStrong/ts-node?utm_source=csdn_github_accelerator)

[Node 的 ESM 加载器钩](https://nodejs.org/api/esm.html#esm_experimental_loaders)子是[**实验性的**](https://nodejs.org/api/documentation.html#documentation_stability_index)，可能会发生变化。ts-node 的 ESM 支持尽可能稳定，但它依赖于节点可以*并且将在*新版本的节点中中断的 API。因此不建议将其用于生产。

有关完整用法、限制和提供反馈的信息，请参阅 [#1007](https://github.com/TypeStrong/ts-node/issues/1007)。

您必须在 中设置“type”：“module” 和[`“module”：“ESNext”。`](https://www.typescriptlang.org/tsconfig/#module) [``](https://nodejs.org/api/packages.html#packages_type)` package.json``tsconfig.json `

[模块|node.js v19.4.0 文档 (nodejs.org)](https://nodejs.org/docs/latest-v19.x/api/packages.html#determining-module-system)
