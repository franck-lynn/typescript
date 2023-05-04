/* eslint-disable */
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

export type Mutation = {
  __typename?: 'Mutation';
  echo: Scalars['String'];
};


export type MutationEchoArgs = {
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
};

export type HelloQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQueryQuery = { __typename?: 'Query', hello: string };

export type EchoMutationMutationVariables = Exact<{
  message: Scalars['String'];
}>;


export type EchoMutationMutation = { __typename?: 'Mutation', echo: string };


export const HelloQueryDocument = gql`
    query HelloQuery {
  hello
}
    `;

export function useHelloQueryQuery(options: Omit<Urql.UseQueryArgs<never, HelloQueryQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<HelloQueryQuery>({ query: HelloQueryDocument, ...options });
};
export const EchoMutationDocument = gql`
    mutation EchoMutation($message: String!) {
  echo(message: $message)
}
    `;

export function useEchoMutationMutation() {
  return Urql.useMutation<EchoMutationMutation, EchoMutationMutationVariables>(EchoMutationDocument);
};