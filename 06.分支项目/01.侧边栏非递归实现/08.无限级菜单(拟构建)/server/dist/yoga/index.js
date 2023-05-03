"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yoga = void 0;
const graphql_yoga_1 = require("graphql-yoga");
// import type { CORSOptions } from "graphql-yoga"
const schema_1 = require("../schema");
// import { plugins } from "./plugins"
exports.yoga = (0, graphql_yoga_1.createYoga)({
    schema: schema_1.schema,
    // plugins,
});
