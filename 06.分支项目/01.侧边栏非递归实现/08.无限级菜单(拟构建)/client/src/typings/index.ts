import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type LoginInput = {
  readonly email: Scalars['String'];
  readonly password: Scalars['String'];
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  readonly login?: Maybe<ResponseInfo>;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type Query = {
  readonly __typename?: 'Query';
  readonly hello?: Maybe<Scalars['String']>;
  readonly user?: Maybe<User>;
};


export type QueryUserArgs = {
  _id: Scalars['ID'];
};

export type ResponseInfo = {
  readonly __typename?: 'ResponseInfo';
  readonly msg?: Maybe<Scalars['String']>;
  readonly status?: Maybe<Scalars['Int']>;
  readonly token?: Maybe<Scalars['String']>;
};

export type User = {
  readonly __typename?: 'User';
  readonly email: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
  readonly password: Scalars['String'];
};

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { readonly __typename?: 'Query', readonly hello?: string | null };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { readonly __typename?: 'Mutation', readonly login?: { readonly __typename?: 'ResponseInfo', readonly status?: number | null, readonly msg?: string | null, readonly token?: string | null } | null };


export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

export function useHelloQuery(options: Omit<Urql.UseQueryArgs<never, HelloQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<HelloQuery>({ query: HelloDocument, ...options });
};
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    status
    msg
    token
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};