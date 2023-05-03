import type { CodegenConfig } from "@graphql-codegen/cli"
const config: CodegenConfig = {
  overwrite: true,
  emitLegacyCommonJSImports: false,
  ignoreNoDocuments: true,
  generates: {
    "./client/src/typings/": {
      schema: "./server/src/schema/**/*.ts",
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
