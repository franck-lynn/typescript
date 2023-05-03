import gql from 'graphql-tag';
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
};

export type LoginInput = {
  readonly email: Scalars['String'];
  readonly password: Scalars['String'];
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  readonly hasEmail?: Maybe<ResponseInfo>;
  readonly login?: Maybe<ResponseInfo>;
  readonly register?: Maybe<ResponseInfo>;
  readonly sendEmail?: Maybe<ResponseInfo>;
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
  readonly __typename?: 'Query';
  readonly allUsers?: Maybe<ReadonlyArray<Maybe<User>>>;
  readonly user?: Maybe<User>;
};


export type QueryUserArgs = {
  _id: Scalars['ID'];
};

export type RegisterInput = {
  readonly email: Scalars['String'];
  readonly name: Scalars['String'];
  readonly password: Scalars['String'];
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
