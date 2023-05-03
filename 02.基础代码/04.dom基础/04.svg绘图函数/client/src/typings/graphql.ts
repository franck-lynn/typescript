/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  MyDate: any;
};

export type Author = {
  __typename?: 'Author';
  /** 作者作品的列表 */
  books?: Maybe<Array<Maybe<Book>>>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Book = {
  __typename?: 'Book';
  author?: Maybe<Author>;
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  findAuthor?: Maybe<Author>;
  hasEmail?: Maybe<ResponseInfo>;
  login?: Maybe<ResponseInfo>;
  register?: Maybe<ResponseInfo>;
  sendEmail?: Maybe<ResponseInfo>;
};


export type MutationFindAuthorArgs = {
  _id: Scalars['Int'];
};


export type MutationHasEmailArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationSendEmailArgs = {
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allUsers?: Maybe<Array<Maybe<User>>>;
  author?: Maybe<Author>;
  authors?: Maybe<Array<Maybe<Author>>>;
  books?: Maybe<Array<Maybe<Book>>>;
  doSomethingYesterday?: Maybe<Scalars['MyDate']>;
  hello?: Maybe<Scalars['String']>;
  helloworld?: Maybe<Scalars['String']>;
  sayByeYesterday?: Maybe<Scalars['String']>;
  today?: Maybe<Scalars['MyDate']>;
  tomorrow?: Maybe<Scalars['MyDate']>;
  user?: Maybe<User>;
  yesterday?: Maybe<Scalars['MyDate']>;
};


export type QueryAuthorArgs = {
  _id: Scalars['Int'];
};


export type QueryDoSomethingYesterdayArgs = {
  before?: InputMaybe<Scalars['MyDate']>;
};


export type QuerySayByeYesterdayArgs = {
  before?: InputMaybe<Scalars['MyDate']>;
};


export type QueryUserArgs = {
  _id: Scalars['ID'];
};

export type RegisterInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type ResponseInfo = {
  __typename?: 'ResponseInfo';
  msg?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  token?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', allUsers?: Array<{ __typename?: 'User', name: string, email: string } | null> | null };

export type BooksQueryVariables = Exact<{ [key: string]: never; }>;


export type BooksQuery = { __typename?: 'Query', books?: Array<{ __typename?: 'Book', title?: string | null } | null> | null };

export type AuthorWithVariablesQueryQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type AuthorWithVariablesQueryQuery = { __typename?: 'Query', author?: { __typename?: 'Author', name: string } | null };


export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const BooksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Books"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"books"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<BooksQuery, BooksQueryVariables>;
export const AuthorWithVariablesQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"authorWithVariablesQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AuthorWithVariablesQueryQuery, AuthorWithVariablesQueryQueryVariables>;