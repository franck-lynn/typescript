# codegen的基本配置

在项目的根目录中, 新建一个 codegen.ts 文件

```ts
// https://the-guild.dev/graphql/codegen/docs/getting-started
import type { CodegenConfig } from "@graphql-codegen/cli"
const config: CodegenConfig = {
  overwrite: true, // 是不是要重写生成的文件?
  emitLegacyCommonJSImports: false, // 生成传统的 commonjs 导入吗?
  ignoreNoDocuments: true, // 是否忽略文档
  generates: { // 生成文件
    "./client/src/typings/": {  // 生成文件的目录所在位置
      // 生成类型文件的模式, 是依据服务器端的接口生成的
      schema: "https://swapi-graphql.netlify.app/.netlify/functions/index",
      documents: ["./client/src/**/*.vue"],
      preset: "client",
      config: {
        useTypeImports: true,
      },
      plugins: [],
    },
  },
}
export default config

```

