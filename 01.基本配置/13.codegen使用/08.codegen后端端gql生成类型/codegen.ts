// https://the-guild.dev/graphql/codegen/docs/getting-started
import type { CodegenConfig } from "@graphql-codegen/cli"
const config: CodegenConfig = {
  overwrite: true,
  emitLegacyCommonJSImports: false,
  ignoreNoDocuments: true,
  generates: {
    "./client/src/typings/": {
      schema: "./server/src/schema/index.ts",
      // schema: "https://swapi-graphql.netlify.app/.netlify/functions/index",
      // documents仅当您使用为客户端生成代码的插件时才需要
      documents: ["./client/src/**/*.graphql"],
      preset: "client",
      config: {
        useTypeImports: true,
      },
      plugins: [],
    },
    "./server/src/types/": {
      // 从模式生成类型文件
      schema: "./server/src/schema/index.ts",
      preset: "graphql-modules",
      // 预设配置
      presetConfig: {
        // https://the-guild.dev/graphql/codegen/plugins/presets/near-operation-file-preset
        // baseTypesPath 必需，应指向基本架构类型文件。 输出的键使用此文件的基本路径
        baseTypesPath: "index.ts",
      },
      config: {
        useIndexSignature: true,
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
  },
}
export default config
