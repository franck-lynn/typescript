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
