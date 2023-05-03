/* eslint-disable */
import * as Types from "../type";
import * as gm from "graphql-modules";
export namespace AuthModule {
  interface DefinedFields {
    Query: 'me';
    Mutation: 'login' | 'signup';
    User: 'username';
  };
  
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type User = Types.User;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type UserResolvers = Pick<Types.UserResolvers, DefinedFields['User']>;
  
  export interface Resolvers {
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    User?: UserResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      me?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      login?: gm.Middleware[];
      signup?: gm.Middleware[];
    };
    User?: {
      '*'?: gm.Middleware[];
      username?: gm.Middleware[];
    };
  };
}