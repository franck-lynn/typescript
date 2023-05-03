// https://the-guild.dev/graphql/codegen/docs/getting-started
import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  emitLegacyCommonJSImports: false,
  ignoreNoDocuments: true,
  generates: {
    // 为每个模块件生成一个类型文件
    //! 文件的目录要包含模式文件
    "./server/src/schemas/": {
      // 从模式生成类型文件
      schema: "./server/src/**/*.ts",
      preset: "graphql-modules",
      // 预设配置
      presetConfig: {
        // https://the-guild.dev/graphql/codegen/plugins/presets/near-operation-file-preset
        // baseTypesPath 必需，应指向基本架构类型文件。 输出的键使用此文件的基本路径
        baseTypesPath: "type.ts",
        // 生成的命名空间是以文件夹命名的
        filename: "generated.ts",
      },
      config: {
        useIndexSignature: true,
        // mappers: {
        //   // 数据库映射的路径是以输出文件的路径为基准
        //   // 例如: 输出的路径是  ./server/src/types/index.ts
        //   // 在 这个index.ts 文件中. 导入的是数据库类型
        //   // import { CartModel, CartItemModel } from '../schema/model';
        //   // 所有在这个导入中是 ../schema/model
        //   // 所以在这里的映射路径就要是"../schema/model#...
        //   Cart: "../schema/model#CartModel",
        //   CartItem: "../schema/model#CartItemModel",
        //   Currency: "../schema/model#CurrencyCode",
        // },
        // 枚举类型也需要像上面一样做映射, 不需要这样做映射
        // enumValues: { Currency: "../schema/model#CurrencyCode" },
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
