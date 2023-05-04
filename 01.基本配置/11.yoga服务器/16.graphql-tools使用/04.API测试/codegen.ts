// https://the-guild.dev/graphql/codegen/docs/getting-started
import type { CodegenConfig } from "@graphql-codegen/cli"
// import { defineConfig } from "@eddeee888/gcg-typescript-resolver-files"

const config: CodegenConfig = {
  // 设置全局选项，包括是否覆盖旧文件、是否使用CommonJS格式、是否忽略未发现的GraphQL文档等。
  overwrite: true,
  emitLegacyCommonJSImports: false,
  ignoreNoDocuments: true,
  // 定义生成的文件的位置和类型，以及生成选项。
  generates: {
    // 为客户端生成GraphQL相关的Typescript代码和类型定义。
    "./client/src/typings/index.ts": {
      schema: "./server/src/schema/**/*.gql", // 服务器这边的 .gql 文件自动生成类型
      // schema: "http://localhost:3000/graphql",
      // 包含GraphQL文件的文件夹
      documents: ["./client/src/**/*.graphql", "./client/src/**/*.vue"],
      // documents 仅当您使用为客户端生成代码的插件时才需要
      // preset: "client", // 与 typescript-vue-urql 有冲突, 已经包含了 vue-apollo 等插件
      plugins: ["typescript", "typescript-operations", "typescript-vue-urql"],
      config: {
        // urqlOptions： Urql 的配置对象，用于设置 Urql 运行时的选项。
        // alwaysRenderErrors 表示始终在组件中呈现 GraphQL 查询和订阅的错误，以便于调试和错误处理。
        urqlOptions: { alwaysRenderErrors: true },
        // noExport：设置为 true 表示在生成的文件中不会为您生成 export。
        // noExport: true,
        // immutableTypes：设置为 true，表示生成的类型是不可变的。这样的好处是使生成的类型更安全，
        // 更符合 TypeScript 等类型安全工具对类型的期望，同时也更易于测试。
        immutableTypes: true,
        // maybeValue：具有 maybe 类型的字段的默认值。当您的服务器返回null时，这允许缺少匹配的类型定义的字段。
        // 因为 null 不会有一个类型，所以需要某种默认值，以便在使用这些字段时避免编译器抛出错误。
        maybeValue: null,
      },
    },

    // 为服务端生成Graphql相关的Typescript代码和类型定义
    "./server/src/schema/": {
      schema: ["./server/src/schema/**/*.gql", "./server/src/schema/**/*.ts"],
      preset: "graphql-modules",
      config: { useIndexSignature: true },
      presetConfig: {
        // baseTypesPath: "../generated-types/graphql.ts", // 以 ./server/src/schema/ 为基路径, baseTypesPath 相对于这个路径
        // filename: "generated-types/module-types.ts", // 在 ./server/src/schema/ 这个路径下, 为各自模块生成类型
        //  下面对上面的生成路径进行更改, 一般而言, 在 resolver 中, 导入的是  ../types/index.ts
        baseTypesPath: "../types/index.ts",
        filename: "generated-types/module-types.ts",
      },

      plugins: [{ add: { content: "/* eslint-disable */" } }, "typescript", "typescript-resolvers"],
    },

    // 为 test 测试 生成相关 typescript 代码和类型定义. 我用 graphql 文件夹表示对前端的输出, gql 文件为后端的输出
    "./test/src/graphql/index.ts": {
      schema: "./test/src/yoga.ts",
      documents: ["./test/src/**/*.ts"],
      // preset: "client", // client-preset 预设会将导入导入带上后缀名, jest 测试会报错
      plugins: [
        { add: { content: "/* eslint-disable */" } },
        "typescript",
        "typescript-operations",
        "typescript-vue-urql",
      ],
    },
  },
}
export default config
