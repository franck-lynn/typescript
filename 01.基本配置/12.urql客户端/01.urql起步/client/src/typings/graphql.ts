/* eslint-disable */
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

export type Link = {
  __typename?: 'Link';
  description: Scalars['String'];
  id: Scalars['ID'];
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  postLink: Link;
};


export type MutationPostLinkArgs = {
  description: Scalars['String'];
  url: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  feed: Array<Link>;
  feedPagination: Array<Link>;
  info: Scalars['String'];
};


export type QueryFeedPaginationArgs = {
  from: Scalars['Int'];
  limit: Scalars['Int'];
};
