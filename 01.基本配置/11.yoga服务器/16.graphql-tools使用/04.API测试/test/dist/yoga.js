"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yoga = void 0;
const graphql_yoga_1 = require("graphql-yoga");
const schema = (0, graphql_yoga_1.createSchema)({
    typeDefs: /* GraphQL */ `
    type Query {
      hello: String!
    }

    type Mutation {
      echo(message: String!): String!
    }
  `,
    resolvers: {
        Query: {
            hello: () => "Hello world!",
        },
        Mutation: {
            echo: (_, args) => args.message,
        },
    },
});
exports.yoga = (0, graphql_yoga_1.createYoga)({
    schema,
});
