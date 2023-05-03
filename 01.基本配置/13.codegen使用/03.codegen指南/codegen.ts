// https://the-guild.dev/graphql/codegen/docs/getting-started
import type { CodegenConfig } from "@graphql-codegen/cli"
const config: CodegenConfig = {
  overwrite: true,
  emitLegacyCommonJSImports: false,
  ignoreNoDocuments: true,
  generates: {
    "./client/src/typings/": {
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
