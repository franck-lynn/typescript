// 自动生成类型文件的示例配置
// https://github.com/dotansimha/graphql-code-generator/blob/master/dev-test/codegen.ts
// 生成文件需要安装 npm install graphql-modules -D 模块
import path from "path"

import { loadFiles } from "@graphql-tools/load-files"
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge"
import { makeExecutableSchema } from "@graphql-tools/schema"

// 用这个在 esm 模块下不成功, 改由自己编写的程序作为加载器
// 就是下面的 loader, 在 utils/load-files 目录下
import { loader } from "../utils/load-files"
import { PATH_CWD } from "../contstants"

//! scalar1: 导入第3方的标量库, 标量库使用
import { typeDefs as scalarTypeDefs, resolvers as scalarResolvers } from "graphql-scalars"
// 导入自定义指令和自定义标量
import {
  directiveTypeDefs,
  directiveTransformers,
  typeDefs as myScalarTypedefs,
  resolvers as myScalarResolvers,
} from "../sdl"

const resolverFilesPath = path.join(PATH_CWD, "./src/gql")

const typeDefsArray = await loadFiles("./**/*.gql") // 返回的是一个数组

typeDefsArray.push(...scalarTypeDefs) // 加入所有的标量库
typeDefsArray.push(...myScalarTypedefs) // 加入自定义标量
typeDefsArray.push(...directiveTypeDefs) // 加入自定义指令
const typeDefs = mergeTypeDefs(typeDefsArray) // 合并模式

//! 这个 index.js 文件可以将本目录下的所有类型定义的 xx.resolvers.js
//! 文件合并在一起, 支持递归调用, loader 采用的是 import() 的形式
//! 返回的是 resolvers 的数组
const pattern = /^.*(?<=\.resolver\.ts|js)$/
const resolversArray = await loader(resolverFilesPath, pattern)

resolversArray.push(scalarResolvers) // 加入标量库的解析器
resolversArray.push(myScalarResolvers) // 加入自定义标量库解析器
const resolvers = mergeResolvers(resolversArray) // 合并解析器

let schema = makeExecutableSchema({
  resolvers,
  typeDefs, // TODO: 这里也要加上自定义指令的 schema
})

// 自定义指令注册, 这个只是相当于自定义指令的 resolver, 还是要在 typeDefs 里声明的
schema = directiveTransformers.reduce((curSchema, transformer) => transformer(curSchema), schema)

export { schema }
