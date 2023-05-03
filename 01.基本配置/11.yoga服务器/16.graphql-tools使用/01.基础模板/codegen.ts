// https://the-guild.dev/graphql/codegen/docs/getting-started
import type { CodegenConfig } from "@graphql-codegen/cli"

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
  },
}
export default config
