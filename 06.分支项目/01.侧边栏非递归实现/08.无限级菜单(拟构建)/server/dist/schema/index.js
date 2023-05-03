"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
// https://graphql.wtf/episodes/26-type-safe-resolvers-with-graphql-code-generator
const graphql_yoga_1 = require("graphql-yoga");
const load_1 = require("@graphql-tools/load");
const graphql_file_loader_1 = require("@graphql-tools/graphql-file-loader");
const schema_1 = require("@graphql-tools/schema");
const path_1 = __importDefault(require("path"));
const links_1 = require("@graphql-tools/links");
const schemaPath = path_1.default.join(process.cwd(), "./**/*.gql");
const resolversPath = path_1.default.join(process.cwd(), "./**/*.ts");
let typeDefs = null;
let resolvers = null;
try {
    const schema = (0, load_1.loadSchemaSync)(schemaPath, {
        loaders: [new links_1.DocumentLoader(), new graphql_file_loader_1.GraphQLFileLoader()],
        assumeValid: true,
    });
    typeDefs = (_b = (_a = schema === null || schema === void 0 ? void 0 : schema.astNode) === null || _a === void 0 ? void 0 : _a.rawSDL) !== null && _b !== void 0 ? _b : null;
    resolvers = require(resolversPath);
    console.log("schemaPath: ", schemaPath); // 调试输出
    console.log("resolversPath: ", resolversPath); // 调试输出
}
catch (error) {
    console.error("Failed to load schema and/or resolvers. %o", error);
}
if (!typeDefs) {
    throw new Error("Failed to load schema. Check your file path and try again.");
}
if (!resolvers) {
    throw new Error("Failed to load resolvers. Check your file path and try again.");
}
exports.schema = (0, graphql_yoga_1.createSchema)({
    typeDefs: (0, schema_1.makeExecutableSchema)({ typeDefs }),
    resolvers: resolvers,
});
