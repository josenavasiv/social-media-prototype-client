import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Error = {
  __typename?: 'Error';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  postCreate: Post;
  postDelete?: Maybe<Scalars['Boolean']>;
  postUpdate?: Maybe<Post>;
  postVote?: Maybe<Scalars['Boolean']>;
  userChangePassword: UserPayload;
  userForgotPassword: Scalars['Boolean'];
  userLogin: UserPayload;
  userLogout: Scalars['Boolean'];
  userRegister: UserPayload;
};


export type MutationPostCreateArgs = {
  text: Scalars['String'];
  title: Scalars['String'];
};


export type MutationPostDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationPostUpdateArgs = {
  id: Scalars['ID'];
  text?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};


export type MutationPostVoteArgs = {
  id: Scalars['ID'];
  value: Scalars['Int'];
};


export type MutationUserChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationUserForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationUserLoginArgs = {
  credentials: UserCredentialsInput;
};


export type MutationUserRegisterArgs = {
  credentials: UserCredentialsInput;
  email: Scalars['String'];
};

export type PaginatedPostsPayload = {
  __typename?: 'PaginatedPostsPayload';
  hasMore: Scalars['Boolean'];
  posts: Array<Post>;
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  points: Scalars['Int'];
  text: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  updoots: Array<Updoot>;
  user: User;
  voteStatus?: Maybe<Scalars['Int']>;
};

export type PostPayload = {
  __typename?: 'PostPayload';
  errors: Array<Error>;
  post?: Maybe<Post>;
};

export type Query = {
  __typename?: 'Query';
  hello?: Maybe<Scalars['String']>;
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: PaginatedPostsPayload;
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryPostsArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
  limit: Scalars['Int'];
};

export type Updoot = {
  __typename?: 'Updoot';
  id: Scalars['ID'];
  postId: Scalars['Int'];
  userId: Scalars['Int'];
  value: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  posts: Array<Post>;
  updatedAt: Scalars['String'];
  updoots: Array<Updoot>;
  username: Scalars['String'];
};

export type UserCredentialsInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserPayload = {
  __typename?: 'UserPayload';
  errors: Array<Error>;
  user?: Maybe<User>;
};

export type PostFragment = { __typename?: 'Post', id: string, text: string, title: string, points: number, createdAt: string, updatedAt: string, voteStatus?: number | null, user: { __typename?: 'User', id: string, username: string, email: string } };

export type UserFragment = { __typename?: 'User', id: string, username: string, email: string };

export type PostCreateMutationVariables = Exact<{
  title: Scalars['String'];
  text: Scalars['String'];
}>;


export type PostCreateMutation = { __typename?: 'Mutation', postCreate: { __typename?: 'Post', id: string, text: string, title: string, points: number, createdAt: string, updatedAt: string, voteStatus?: number | null, user: { __typename?: 'User', id: string, username: string, email: string } } };

export type PostVoteMutationVariables = Exact<{
  postVoteId: Scalars['ID'];
  value: Scalars['Int'];
}>;


export type PostVoteMutation = { __typename?: 'Mutation', postVote?: boolean | null };

export type UserChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type UserChangePasswordMutation = { __typename?: 'Mutation', userChangePassword: { __typename?: 'UserPayload', user?: { __typename?: 'User', id: string, username: string, email: string } | null, errors: Array<{ __typename?: 'Error', message: string, field: string }> } };

export type UserForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type UserForgotPasswordMutation = { __typename?: 'Mutation', userForgotPassword: boolean };

export type UserLoginMutationVariables = Exact<{
  credentials: UserCredentialsInput;
}>;


export type UserLoginMutation = { __typename?: 'Mutation', userLogin: { __typename?: 'UserPayload', user?: { __typename?: 'User', id: string, username: string, email: string } | null, errors: Array<{ __typename?: 'Error', field: string, message: string }> } };

export type UserLogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type UserLogoutMutation = { __typename?: 'Mutation', userLogout: boolean };

export type UserRegisterMutationVariables = Exact<{
  credentials: UserCredentialsInput;
  email: Scalars['String'];
}>;


export type UserRegisterMutation = { __typename?: 'Mutation', userRegister: { __typename?: 'UserPayload', user?: { __typename?: 'User', id: string, username: string, email: string } | null, errors: Array<{ __typename?: 'Error', field: string, message: string }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string, email: string } | null };

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['Int']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PaginatedPostsPayload', hasMore: boolean, posts: Array<{ __typename?: 'Post', id: string, text: string, title: string, points: number, createdAt: string, updatedAt: string, voteStatus?: number | null, user: { __typename?: 'User', id: string, username: string, email: string } }> } };

export const UserFragmentDoc = gql`
    fragment User on User {
  id
  username
  email
}
    `;
export const PostFragmentDoc = gql`
    fragment Post on Post {
  id
  text
  title
  points
  createdAt
  updatedAt
  user {
    ...User
  }
  voteStatus
}
    ${UserFragmentDoc}`;
export const PostCreateDocument = gql`
    mutation postCreate($title: String!, $text: String!) {
  postCreate(title: $title, text: $text) {
    ...Post
  }
}
    ${PostFragmentDoc}`;
export type PostCreateMutationFn = Apollo.MutationFunction<PostCreateMutation, PostCreateMutationVariables>;

/**
 * __usePostCreateMutation__
 *
 * To run a mutation, you first call `usePostCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postCreateMutation, { data, loading, error }] = usePostCreateMutation({
 *   variables: {
 *      title: // value for 'title'
 *      text: // value for 'text'
 *   },
 * });
 */
export function usePostCreateMutation(baseOptions?: Apollo.MutationHookOptions<PostCreateMutation, PostCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostCreateMutation, PostCreateMutationVariables>(PostCreateDocument, options);
      }
export type PostCreateMutationHookResult = ReturnType<typeof usePostCreateMutation>;
export type PostCreateMutationResult = Apollo.MutationResult<PostCreateMutation>;
export type PostCreateMutationOptions = Apollo.BaseMutationOptions<PostCreateMutation, PostCreateMutationVariables>;
export const PostVoteDocument = gql`
    mutation postVote($postVoteId: ID!, $value: Int!) {
  postVote(id: $postVoteId, value: $value)
}
    `;
export type PostVoteMutationFn = Apollo.MutationFunction<PostVoteMutation, PostVoteMutationVariables>;

/**
 * __usePostVoteMutation__
 *
 * To run a mutation, you first call `usePostVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postVoteMutation, { data, loading, error }] = usePostVoteMutation({
 *   variables: {
 *      postVoteId: // value for 'postVoteId'
 *      value: // value for 'value'
 *   },
 * });
 */
export function usePostVoteMutation(baseOptions?: Apollo.MutationHookOptions<PostVoteMutation, PostVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostVoteMutation, PostVoteMutationVariables>(PostVoteDocument, options);
      }
export type PostVoteMutationHookResult = ReturnType<typeof usePostVoteMutation>;
export type PostVoteMutationResult = Apollo.MutationResult<PostVoteMutation>;
export type PostVoteMutationOptions = Apollo.BaseMutationOptions<PostVoteMutation, PostVoteMutationVariables>;
export const UserChangePasswordDocument = gql`
    mutation userChangePassword($token: String!, $newPassword: String!) {
  userChangePassword(token: $token, newPassword: $newPassword) {
    user {
      ...User
    }
    errors {
      message
      field
    }
  }
}
    ${UserFragmentDoc}`;
export type UserChangePasswordMutationFn = Apollo.MutationFunction<UserChangePasswordMutation, UserChangePasswordMutationVariables>;

/**
 * __useUserChangePasswordMutation__
 *
 * To run a mutation, you first call `useUserChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userChangePasswordMutation, { data, loading, error }] = useUserChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useUserChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<UserChangePasswordMutation, UserChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserChangePasswordMutation, UserChangePasswordMutationVariables>(UserChangePasswordDocument, options);
      }
export type UserChangePasswordMutationHookResult = ReturnType<typeof useUserChangePasswordMutation>;
export type UserChangePasswordMutationResult = Apollo.MutationResult<UserChangePasswordMutation>;
export type UserChangePasswordMutationOptions = Apollo.BaseMutationOptions<UserChangePasswordMutation, UserChangePasswordMutationVariables>;
export const UserForgotPasswordDocument = gql`
    mutation userForgotPassword($email: String!) {
  userForgotPassword(email: $email)
}
    `;
export type UserForgotPasswordMutationFn = Apollo.MutationFunction<UserForgotPasswordMutation, UserForgotPasswordMutationVariables>;

/**
 * __useUserForgotPasswordMutation__
 *
 * To run a mutation, you first call `useUserForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userForgotPasswordMutation, { data, loading, error }] = useUserForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUserForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<UserForgotPasswordMutation, UserForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserForgotPasswordMutation, UserForgotPasswordMutationVariables>(UserForgotPasswordDocument, options);
      }
export type UserForgotPasswordMutationHookResult = ReturnType<typeof useUserForgotPasswordMutation>;
export type UserForgotPasswordMutationResult = Apollo.MutationResult<UserForgotPasswordMutation>;
export type UserForgotPasswordMutationOptions = Apollo.BaseMutationOptions<UserForgotPasswordMutation, UserForgotPasswordMutationVariables>;
export const UserLoginDocument = gql`
    mutation userLogin($credentials: UserCredentialsInput!) {
  userLogin(credentials: $credentials) {
    user {
      ...User
    }
    errors {
      field
      message
    }
  }
}
    ${UserFragmentDoc}`;
export type UserLoginMutationFn = Apollo.MutationFunction<UserLoginMutation, UserLoginMutationVariables>;

/**
 * __useUserLoginMutation__
 *
 * To run a mutation, you first call `useUserLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userLoginMutation, { data, loading, error }] = useUserLoginMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useUserLoginMutation(baseOptions?: Apollo.MutationHookOptions<UserLoginMutation, UserLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserLoginMutation, UserLoginMutationVariables>(UserLoginDocument, options);
      }
export type UserLoginMutationHookResult = ReturnType<typeof useUserLoginMutation>;
export type UserLoginMutationResult = Apollo.MutationResult<UserLoginMutation>;
export type UserLoginMutationOptions = Apollo.BaseMutationOptions<UserLoginMutation, UserLoginMutationVariables>;
export const UserLogoutDocument = gql`
    mutation userLogout {
  userLogout
}
    `;
export type UserLogoutMutationFn = Apollo.MutationFunction<UserLogoutMutation, UserLogoutMutationVariables>;

/**
 * __useUserLogoutMutation__
 *
 * To run a mutation, you first call `useUserLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userLogoutMutation, { data, loading, error }] = useUserLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useUserLogoutMutation(baseOptions?: Apollo.MutationHookOptions<UserLogoutMutation, UserLogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserLogoutMutation, UserLogoutMutationVariables>(UserLogoutDocument, options);
      }
export type UserLogoutMutationHookResult = ReturnType<typeof useUserLogoutMutation>;
export type UserLogoutMutationResult = Apollo.MutationResult<UserLogoutMutation>;
export type UserLogoutMutationOptions = Apollo.BaseMutationOptions<UserLogoutMutation, UserLogoutMutationVariables>;
export const UserRegisterDocument = gql`
    mutation userRegister($credentials: UserCredentialsInput!, $email: String!) {
  userRegister(credentials: $credentials, email: $email) {
    user {
      ...User
    }
    errors {
      field
      message
    }
  }
}
    ${UserFragmentDoc}`;
export type UserRegisterMutationFn = Apollo.MutationFunction<UserRegisterMutation, UserRegisterMutationVariables>;

/**
 * __useUserRegisterMutation__
 *
 * To run a mutation, you first call `useUserRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userRegisterMutation, { data, loading, error }] = useUserRegisterMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUserRegisterMutation(baseOptions?: Apollo.MutationHookOptions<UserRegisterMutation, UserRegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserRegisterMutation, UserRegisterMutationVariables>(UserRegisterDocument, options);
      }
export type UserRegisterMutationHookResult = ReturnType<typeof useUserRegisterMutation>;
export type UserRegisterMutationResult = Apollo.MutationResult<UserRegisterMutation>;
export type UserRegisterMutationOptions = Apollo.BaseMutationOptions<UserRegisterMutation, UserRegisterMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: Int) {
  posts(limit: $limit, cursor: $cursor) {
    posts {
      ...Post
    }
    hasMore
  }
}
    ${PostFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;