"use strict";
// https://the-guild.dev/graphql/tools/docs/generate-schema
// https://the-guild.dev/graphql/tools
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
// import path from "path"
// import { loadSchemaSync } from "@graphql-tools/load"
const load_files_1 = require("@graphql-tools/load-files");
// import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
const merge_1 = require("@graphql-tools/merge");
const schema_1 = require("@graphql-tools/schema");
const author_resolver_1 = require("./author/author.resolver");
// 这个 typeDefs 是由 ts 文件编写的
const author_typeDefs_1 = require("./author/author.typeDefs");
// 也可以使用 @graphql-tools/load 的 loadDocuments 和  @graphql-tools/code-file-loader
// 的加载器 CodeFileloader 对 ts 文件写的类型进行加载,CodeFileLoader 是从 ts 文件中
// 提取 graphql 定义, 这个没有测试成功, 还是采取一个一个文件导入的方式
// import { loadDocumentsSync } from "@graphql-tools/load"
// import { CodeFileLoader } from "@graphql-tools/code-file-loader"
// const documents = loadDocumentsSync("./**/*.js", { loaders: [new CodeFileLoader()], pluckConfig: {} })
// 也可以这样读取
const typeDefsArray = (0, load_files_1.loadFilesSync)("./**/*.gql"); // 返回的是一个数组
const typeDefs = (0, merge_1.mergeTypeDefs)([...typeDefsArray, author_typeDefs_1.typeDefs]);
// const typeDefs = mergeTypeDefs([authorSchema])
const resolvers = (0, merge_1.mergeResolvers)([author_resolver_1.resolvers]);
exports.schema = (0, schema_1.makeExecutableSchema)({
    typeDefs,
    resolvers,
});
