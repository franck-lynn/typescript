import type { CodegenConfig } from "@graphql-codegen/cli"

// 这个与 codegen.yml 的作用是相同的
const config: CodegenConfig = {
  overwrite: true,
  // schema: "./server/src/gql/**/typedefs/*.gql", // 服务器这边的 .gql 文件自动生成类型
  // documents: ["./client/src/**/*.vue", "./client/src/**/*.graphql"],
  emitLegacyCommonJSImports: false,
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./client/src/typings/": {
      documents: ["./client/src/**/*.vue", "./client/src/**/*.graphql"],
      schema: "./server/src/gql/**/typedefs/*.gql", // 服务器这边的 .gql 文件自动生成类型
      preset: "client", // 不要这个预设, 前端只生成一个文件 operations-types.ts
      config: {
        useTypeImports: true,
      },
      // plugins: ["typescript", "typescript-operations", "typescript-vue-urql"],
      plugins: [],
    },
    // *********************** 服务器端 ***********************
    // 这个是文件夹, "./server/src/gql/"  自动生成的类型
    // 文件以这个作为基准,
    "./server/src/gql/": {
      schema: "./server/src/gql/**/typedefs/*.gql", // 服务器这边的 .gql 文件自动生成类型
      preset: "graphql-modules",
      presetConfig: {
        // 在 "./server/src/gql/" 为基准的情况下,
        // "../ "表示基准的上一级, 也就是 "./server/src".
        // 与 gql 是平级的
        baseTypesPath: "../types/index.ts",
        // 表示在每个包含 typedefs 目录下的模块都生成的
        // 类型文件, 如果 'types/module-types.ts'
        // 则会多一层文件夹 types
        filename: "generated.ts",
      },
      config: {
        useIndexSignature: true,
        // 可以加入 scalar 的类型
        // JSON: "string",
        // https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-resolvers#configuration
        // 插件的 mappers 配置
        mappers: {
          // User 映射的数据库类型
          // 由于生成的 types 是在 src 下,
          // 在这个生成的文件中, 导入下面这个映射的类型.
          // 而这个文件是在 types 下, 所以, 先跳出再进入是两个点..
          // User.model 是导入的文件名, from '' 部分
          // IUser 是导入的名称, import '' 部分
          // 自动略去了 index.ts 路径, 符合预期
          User: "../db/#IUser",
        },
      },
      plugins: [
        {
          add: {
            content: "/* eslint-disable */",
          },
        },
        "typescript",
        "typescript-resolvers",
      ],
    },
    // 测试标量的自动生成类型不成功
    // "./server/src/sdl/types/types.ts": {
    //   schema: "./server/src/sdl/codegen/codegen.ts",
    //   plugins: ["typescript"],
    // },
  },

  // https://github.com/Urigo/graphql-scalars/tree/master/codegen-test
}

export default config
