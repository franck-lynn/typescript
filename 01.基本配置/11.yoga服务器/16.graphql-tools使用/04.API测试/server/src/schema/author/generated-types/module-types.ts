/* eslint-disable */
import * as Types from "../../../types/index";
import * as gm from "graphql-modules";
export namespace AuthorModule {
  interface DefinedFields {
    Author: 'id' | 'firstName' | 'lastName' | 'posts';
    Post: 'id' | 'title' | 'author' | 'votes';
    Query: 'posts' | 'author';
    Mutation: 'upvotePost';
  };
  
  export type Author = Pick<Types.Author, DefinedFields['Author']>;
  export type Post = Pick<Types.Post, DefinedFields['Post']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  
  export type AuthorResolvers = Pick<Types.AuthorResolvers, DefinedFields['Author'] | '__isTypeOf'>;
  export type PostResolvers = Pick<Types.PostResolvers, DefinedFields['Post'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  
  export interface Resolvers {
    Author?: AuthorResolvers;
    Post?: PostResolvers;
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Author?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      firstName?: gm.Middleware[];
      lastName?: gm.Middleware[];
      posts?: gm.Middleware[];
    };
    Post?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      title?: gm.Middleware[];
      author?: gm.Middleware[];
      votes?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      posts?: gm.Middleware[];
      author?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      upvotePost?: gm.Middleware[];
    };
  };
}