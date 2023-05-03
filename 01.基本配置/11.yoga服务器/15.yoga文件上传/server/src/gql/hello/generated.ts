/* eslint-disable */
import * as Types from "../../types/index";
import * as gm from "graphql-modules";
export namespace HelloModule {
  interface DefinedFields {
    Book: 'id' | 'title' | 'author';
    Author: 'id' | 'name' | 'books';
    Query: 'hello' | 'helloworld' | 'yesterday' | 'doSomethingYesterday' | 'sayByeYesterday' | 'today' | 'tomorrow' | 'books' | 'author' | 'authors';
    Mutation: 'findAuthor';
  };
  
  export type Book = Pick<Types.Book, DefinedFields['Book']>;
  export type Author = Pick<Types.Author, DefinedFields['Author']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  
  export type Scalars = Pick<Types.Scalars, 'MyDate'>;
  export type MyDateScalarConfig = Types.MyDateScalarConfig;
  
  export type BookResolvers = Pick<Types.BookResolvers, DefinedFields['Book'] | '__isTypeOf'>;
  export type AuthorResolvers = Pick<Types.AuthorResolvers, DefinedFields['Author'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  
  export interface Resolvers {
    Book?: BookResolvers;
    Author?: AuthorResolvers;
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    MyDate?: Types.Resolvers['MyDate'];
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Book?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      title?: gm.Middleware[];
      author?: gm.Middleware[];
    };
    Author?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      name?: gm.Middleware[];
      books?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      hello?: gm.Middleware[];
      helloworld?: gm.Middleware[];
      yesterday?: gm.Middleware[];
      doSomethingYesterday?: gm.Middleware[];
      sayByeYesterday?: gm.Middleware[];
      today?: gm.Middleware[];
      tomorrow?: gm.Middleware[];
      books?: gm.Middleware[];
      author?: gm.Middleware[];
      authors?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      findAuthor?: gm.Middleware[];
    };
  };
}