# mocha 支持 esm 思路和关键点

### 思路

转成 js 在进行测试

### 关键点

1.  转成 esm 模块的 babel.confog.json

```json
{
    "presets": [
        // ["@babel/preset-env", {
        //     // 让 babel 把当前的代码基于你当前的 nodejs 版本进行编译
        //     "targets": {
        //         "node": "current"
        //     }
        // }],
        // 转译 ts -> js
        "@babel/preset-typescript"
    ]
}
```

2. package.json 配置

​     <font color=red>"type": "module",</font>

​      <font color=red>mocha -r esm dist/03.异步代码02.js  mocha 要配置成支持 esm</font>

```json
{
  "name": "mocha-ts",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "rimraf dist &&  babel src --out-dir dist  --extensions .ts --config-file ./babel.config.json && mocha -r esm dist/03.异步代码02.js"
  },
  "author": "",
  "license": "ISC"
}
```



