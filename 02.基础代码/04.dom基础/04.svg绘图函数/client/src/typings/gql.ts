/* eslint-disable */
import * as types from './graphql.js';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  query Users {\n    allUsers {\n      name\n      email\n    }\n  }\n": types.UsersDocument,
    "\n  query Books {\n    books {\n      title\n    }\n  }\n": types.BooksDocument,
    "\n    query authorWithVariablesQuery($id: Int!) {\n      author(_id: $id) {\n        name\n      }\n    }\n  ": types.AuthorWithVariablesQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Users {\n    allUsers {\n      name\n      email\n    }\n  }\n"): (typeof documents)["\n  query Users {\n    allUsers {\n      name\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Books {\n    books {\n      title\n    }\n  }\n"): (typeof documents)["\n  query Books {\n    books {\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query authorWithVariablesQuery($id: Int!) {\n      author(_id: $id) {\n        name\n      }\n    }\n  "): (typeof documents)["\n    query authorWithVariablesQuery($id: Int!) {\n      author(_id: $id) {\n        name\n      }\n    }\n  "];

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;