// https://the-guild.dev/graphql/codegen/docs/guides/graphql-modules
// 这是给服务器用的
import type { CodegenConfig } from "@graphql-codegen/cli"
const config: CodegenConfig = {
  overwrite: true,
  emitLegacyCommonJSImports: false,
  ignoreNoDocuments: true,
  generates: {
    "./client/src/typings/": {
      documents: ["./client/src/**/*.vue"],
      schema: "./server/src/schema/index.ts",
      preset: "client",
      config: {
        useTypeImports: true,
      },
      plugins: [],
    },
    //  一个映射,其中键表示生成的代码的输出路径
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
