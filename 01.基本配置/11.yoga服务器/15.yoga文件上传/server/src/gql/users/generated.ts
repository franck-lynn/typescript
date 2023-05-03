/* eslint-disable */
import * as Types from "../../types/index";
import * as gm from "graphql-modules";
export namespace UsersModule {
  interface DefinedFields {
    User: 'id' | 'name' | 'email' | 'password';
    ResponseInfo: 'status' | 'msg' | 'token';
    Query: 'allUsers' | 'user';
    Mutation: 'login' | 'register' | 'hasEmail' | 'sendEmail';
  };
  
  interface DefinedInputFields {
    RegisterInput: 'name' | 'email' | 'password';
    LoginInput: 'email' | 'password';
  };
  
  export type User = Pick<Types.User, DefinedFields['User']>;
  export type ResponseInfo = Pick<Types.ResponseInfo, DefinedFields['ResponseInfo']>;
  export type RegisterInput = Pick<Types.RegisterInput, DefinedInputFields['RegisterInput']>;
  export type LoginInput = Pick<Types.LoginInput, DefinedInputFields['LoginInput']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  
  export type UserResolvers = Pick<Types.UserResolvers, DefinedFields['User'] | '__isTypeOf'>;
  export type ResponseInfoResolvers = Pick<Types.ResponseInfoResolvers, DefinedFields['ResponseInfo'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  
  export interface Resolvers {
    User?: UserResolvers;
    ResponseInfo?: ResponseInfoResolvers;
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    User?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      name?: gm.Middleware[];
      email?: gm.Middleware[];
      password?: gm.Middleware[];
    };
    ResponseInfo?: {
      '*'?: gm.Middleware[];
      status?: gm.Middleware[];
      msg?: gm.Middleware[];
      token?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      allUsers?: gm.Middleware[];
      user?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      login?: gm.Middleware[];
      register?: gm.Middleware[];
      hasEmail?: gm.Middleware[];
      sendEmail?: gm.Middleware[];
    };
  };
}