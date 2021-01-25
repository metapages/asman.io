/* eslint-disable */
import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
  uuid: any;
  jsonb: any;
  json: any;
};

export type IsUsernameOutput = {
  __typename?: 'IsUsernameOutput';
  exists: Scalars['Boolean'];
};


/** expression to compare columns of type json. All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _eq?: Maybe<Scalars['json']>;
  _gt?: Maybe<Scalars['json']>;
  _gte?: Maybe<Scalars['json']>;
  _in?: Maybe<Array<Scalars['json']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['json']>;
  _lte?: Maybe<Scalars['json']>;
  _neq?: Maybe<Scalars['json']>;
  _nin?: Maybe<Array<Scalars['json']>>;
};


/** expression to compare columns of type jsonb. All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in?: Maybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: Maybe<Scalars['jsonb']>;
  _eq?: Maybe<Scalars['jsonb']>;
  _gt?: Maybe<Scalars['jsonb']>;
  _gte?: Maybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: Maybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: Maybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: Maybe<Array<Scalars['String']>>;
  _in?: Maybe<Array<Scalars['jsonb']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['jsonb']>;
  _lte?: Maybe<Scalars['jsonb']>;
  _neq?: Maybe<Scalars['jsonb']>;
  _nin?: Maybe<Array<Scalars['jsonb']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "tokens" */
  delete_tokens?: Maybe<Tokens_Mutation_Response>;
  /** delete single row from the table: "tokens" */
  delete_tokens_by_pk?: Maybe<Tokens>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** delete data from the table: "users_preferences" */
  delete_users_preferences?: Maybe<Users_Preferences_Mutation_Response>;
  /** delete single row from the table: "users_preferences" */
  delete_users_preferences_by_pk?: Maybe<Users_Preferences>;
  /** insert data into the table: "tokens" */
  insert_tokens?: Maybe<Tokens_Mutation_Response>;
  /** insert a single row into the table: "tokens" */
  insert_tokens_one?: Maybe<Tokens>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** insert data into the table: "users_preferences" */
  insert_users_preferences?: Maybe<Users_Preferences_Mutation_Response>;
  /** insert a single row into the table: "users_preferences" */
  insert_users_preferences_one?: Maybe<Users_Preferences>;
  /** perform the action: "setUsername" */
  setUsername?: Maybe<SetUsernameOutput>;
  /** update data of the table: "tokens" */
  update_tokens?: Maybe<Tokens_Mutation_Response>;
  /** update single row of the table: "tokens" */
  update_tokens_by_pk?: Maybe<Tokens>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update data of the table: "users_preferences" */
  update_users_preferences?: Maybe<Users_Preferences_Mutation_Response>;
  /** update single row of the table: "users_preferences" */
  update_users_preferences_by_pk?: Maybe<Users_Preferences>;
};


/** mutation root */
export type Mutation_RootDelete_TokensArgs = {
  where: Tokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Tokens_By_PkArgs = {
  token: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Users_PreferencesArgs = {
  where: Users_Preferences_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_Preferences_By_PkArgs = {
  user: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_TokensArgs = {
  objects: Array<Tokens_Insert_Input>;
  on_conflict?: Maybe<Tokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Tokens_OneArgs = {
  object: Tokens_Insert_Input;
  on_conflict?: Maybe<Tokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_PreferencesArgs = {
  objects: Array<Users_Preferences_Insert_Input>;
  on_conflict?: Maybe<Users_Preferences_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_Preferences_OneArgs = {
  object: Users_Preferences_Insert_Input;
  on_conflict?: Maybe<Users_Preferences_On_Conflict>;
};


/** mutation root */
export type Mutation_RootSetUsernameArgs = {
  username: Scalars['String'];
};


/** mutation root */
export type Mutation_RootUpdate_TokensArgs = {
  _set?: Maybe<Tokens_Set_Input>;
  where: Tokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Tokens_By_PkArgs = {
  _set?: Maybe<Tokens_Set_Input>;
  pk_columns: Tokens_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: Maybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: Maybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Users_PreferencesArgs = {
  _append?: Maybe<Users_Preferences_Append_Input>;
  _delete_at_path?: Maybe<Users_Preferences_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Users_Preferences_Delete_Elem_Input>;
  _delete_key?: Maybe<Users_Preferences_Delete_Key_Input>;
  _prepend?: Maybe<Users_Preferences_Prepend_Input>;
  _set?: Maybe<Users_Preferences_Set_Input>;
  where: Users_Preferences_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_Preferences_By_PkArgs = {
  _append?: Maybe<Users_Preferences_Append_Input>;
  _delete_at_path?: Maybe<Users_Preferences_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Users_Preferences_Delete_Elem_Input>;
  _delete_key?: Maybe<Users_Preferences_Delete_Key_Input>;
  _prepend?: Maybe<Users_Preferences_Prepend_Input>;
  _set?: Maybe<Users_Preferences_Set_Input>;
  pk_columns: Users_Preferences_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** perform the action: "isUsername" */
  isUsername?: Maybe<IsUsernameOutput>;
  /** fetch data from the table: "tokens" */
  tokens: Array<Tokens>;
  /** fetch aggregated fields from the table: "tokens" */
  tokens_aggregate: Tokens_Aggregate;
  /** fetch data from the table: "tokens" using primary key columns */
  tokens_by_pk?: Maybe<Tokens>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "users_preferences" */
  users_preferences: Array<Users_Preferences>;
  /** fetch aggregated fields from the table: "users_preferences" */
  users_preferences_aggregate: Users_Preferences_Aggregate;
  /** fetch data from the table: "users_preferences" using primary key columns */
  users_preferences_by_pk?: Maybe<Users_Preferences>;
};


/** query root */
export type Query_RootIsUsernameArgs = {
  username: Scalars['String'];
};


/** query root */
export type Query_RootTokensArgs = {
  distinct_on?: Maybe<Array<Tokens_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Tokens_Order_By>>;
  where?: Maybe<Tokens_Bool_Exp>;
};


/** query root */
export type Query_RootTokens_AggregateArgs = {
  distinct_on?: Maybe<Array<Tokens_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Tokens_Order_By>>;
  where?: Maybe<Tokens_Bool_Exp>;
};


/** query root */
export type Query_RootTokens_By_PkArgs = {
  token: Scalars['String'];
};


/** query root */
export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootUsers_PreferencesArgs = {
  distinct_on?: Maybe<Array<Users_Preferences_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Preferences_Order_By>>;
  where?: Maybe<Users_Preferences_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_Preferences_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Preferences_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Preferences_Order_By>>;
  where?: Maybe<Users_Preferences_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_Preferences_By_PkArgs = {
  user: Scalars['uuid'];
};

export type SetUsernameOutput = {
  __typename?: 'SetUsernameOutput';
  error?: Maybe<Scalars['String']>;
  setUsername_username?: Maybe<Users>;
  username?: Maybe<Scalars['String']>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** perform the action: "isUsername" */
  isUsername?: Maybe<IsUsernameOutput>;
  /** fetch data from the table: "tokens" */
  tokens: Array<Tokens>;
  /** fetch aggregated fields from the table: "tokens" */
  tokens_aggregate: Tokens_Aggregate;
  /** fetch data from the table: "tokens" using primary key columns */
  tokens_by_pk?: Maybe<Tokens>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "users_preferences" */
  users_preferences: Array<Users_Preferences>;
  /** fetch aggregated fields from the table: "users_preferences" */
  users_preferences_aggregate: Users_Preferences_Aggregate;
  /** fetch data from the table: "users_preferences" using primary key columns */
  users_preferences_by_pk?: Maybe<Users_Preferences>;
};


/** subscription root */
export type Subscription_RootIsUsernameArgs = {
  username: Scalars['String'];
};


/** subscription root */
export type Subscription_RootTokensArgs = {
  distinct_on?: Maybe<Array<Tokens_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Tokens_Order_By>>;
  where?: Maybe<Tokens_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTokens_AggregateArgs = {
  distinct_on?: Maybe<Array<Tokens_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Tokens_Order_By>>;
  where?: Maybe<Tokens_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTokens_By_PkArgs = {
  token: Scalars['String'];
};


/** subscription root */
export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootUsers_PreferencesArgs = {
  distinct_on?: Maybe<Array<Users_Preferences_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Preferences_Order_By>>;
  where?: Maybe<Users_Preferences_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_Preferences_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Preferences_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Preferences_Order_By>>;
  where?: Maybe<Users_Preferences_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_Preferences_By_PkArgs = {
  user: Scalars['uuid'];
};


/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "tokens" */
export type Tokens = {
  __typename?: 'tokens';
  accessed_at: Scalars['timestamptz'];
  created_at: Scalars['timestamptz'];
  expires_at?: Maybe<Scalars['timestamptz']>;
  token: Scalars['String'];
  user: Scalars['uuid'];
  /** An object relationship */
  userByUser: Users;
};

/** aggregated selection of "tokens" */
export type Tokens_Aggregate = {
  __typename?: 'tokens_aggregate';
  aggregate?: Maybe<Tokens_Aggregate_Fields>;
  nodes: Array<Tokens>;
};

/** aggregate fields of "tokens" */
export type Tokens_Aggregate_Fields = {
  __typename?: 'tokens_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Tokens_Max_Fields>;
  min?: Maybe<Tokens_Min_Fields>;
};


/** aggregate fields of "tokens" */
export type Tokens_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Tokens_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "tokens" */
export type Tokens_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Tokens_Max_Order_By>;
  min?: Maybe<Tokens_Min_Order_By>;
};

/** input type for inserting array relation for remote table "tokens" */
export type Tokens_Arr_Rel_Insert_Input = {
  data: Array<Tokens_Insert_Input>;
  on_conflict?: Maybe<Tokens_On_Conflict>;
};

/** Boolean expression to filter rows from the table "tokens". All fields are combined with a logical 'AND'. */
export type Tokens_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Tokens_Bool_Exp>>>;
  _not?: Maybe<Tokens_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Tokens_Bool_Exp>>>;
  accessed_at?: Maybe<Timestamptz_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  expires_at?: Maybe<Timestamptz_Comparison_Exp>;
  token?: Maybe<String_Comparison_Exp>;
  user?: Maybe<Uuid_Comparison_Exp>;
  userByUser?: Maybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "tokens" */
export enum Tokens_Constraint {
  /** unique or primary key constraint */
  TokensPkey = 'tokens_pkey'
}

/** input type for inserting data into table "tokens" */
export type Tokens_Insert_Input = {
  accessed_at?: Maybe<Scalars['timestamptz']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  expires_at?: Maybe<Scalars['timestamptz']>;
  token?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['uuid']>;
  userByUser?: Maybe<Users_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Tokens_Max_Fields = {
  __typename?: 'tokens_max_fields';
  accessed_at?: Maybe<Scalars['timestamptz']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  expires_at?: Maybe<Scalars['timestamptz']>;
  token?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "tokens" */
export type Tokens_Max_Order_By = {
  accessed_at?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  expires_at?: Maybe<Order_By>;
  token?: Maybe<Order_By>;
  user?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Tokens_Min_Fields = {
  __typename?: 'tokens_min_fields';
  accessed_at?: Maybe<Scalars['timestamptz']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  expires_at?: Maybe<Scalars['timestamptz']>;
  token?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "tokens" */
export type Tokens_Min_Order_By = {
  accessed_at?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  expires_at?: Maybe<Order_By>;
  token?: Maybe<Order_By>;
  user?: Maybe<Order_By>;
};

/** response of any mutation on the table "tokens" */
export type Tokens_Mutation_Response = {
  __typename?: 'tokens_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Tokens>;
};

/** input type for inserting object relation for remote table "tokens" */
export type Tokens_Obj_Rel_Insert_Input = {
  data: Tokens_Insert_Input;
  on_conflict?: Maybe<Tokens_On_Conflict>;
};

/** on conflict condition type for table "tokens" */
export type Tokens_On_Conflict = {
  constraint: Tokens_Constraint;
  update_columns: Array<Tokens_Update_Column>;
  where?: Maybe<Tokens_Bool_Exp>;
};

/** ordering options when selecting data from "tokens" */
export type Tokens_Order_By = {
  accessed_at?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  expires_at?: Maybe<Order_By>;
  token?: Maybe<Order_By>;
  user?: Maybe<Order_By>;
  userByUser?: Maybe<Users_Order_By>;
};

/** primary key columns input for table: "tokens" */
export type Tokens_Pk_Columns_Input = {
  token: Scalars['String'];
};

/** select columns of table "tokens" */
export enum Tokens_Select_Column {
  /** column name */
  AccessedAt = 'accessed_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExpiresAt = 'expires_at',
  /** column name */
  Token = 'token',
  /** column name */
  User = 'user'
}

/** input type for updating data in table "tokens" */
export type Tokens_Set_Input = {
  accessed_at?: Maybe<Scalars['timestamptz']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  expires_at?: Maybe<Scalars['timestamptz']>;
  token?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['uuid']>;
};

/** update columns of table "tokens" */
export enum Tokens_Update_Column {
  /** column name */
  AccessedAt = 'accessed_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExpiresAt = 'expires_at',
  /** column name */
  Token = 'token',
  /** column name */
  User = 'user'
}

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  email: Scalars['String'];
  id: Scalars['uuid'];
  picture?: Maybe<Scalars['String']>;
  /** An array relationship */
  tokens: Array<Tokens>;
  /** An aggregated array relationship */
  tokens_aggregate: Tokens_Aggregate;
  username?: Maybe<Scalars['String']>;
};


/** columns and relationships of "users" */
export type UsersTokensArgs = {
  distinct_on?: Maybe<Array<Tokens_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Tokens_Order_By>>;
  where?: Maybe<Tokens_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersTokens_AggregateArgs = {
  distinct_on?: Maybe<Array<Tokens_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Tokens_Order_By>>;
  where?: Maybe<Tokens_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "users" */
export type Users_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Users_Max_Order_By>;
  min?: Maybe<Users_Min_Order_By>;
};

/** input type for inserting array relation for remote table "users" */
export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  _not?: Maybe<Users_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  email?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  picture?: Maybe<String_Comparison_Exp>;
  tokens?: Maybe<Tokens_Bool_Exp>;
  username?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersEmailKey = 'users_email_key',
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey',
  /** unique or primary key constraint */
  UsersUsernameKey = 'users_username_key'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  picture?: Maybe<Scalars['String']>;
  tokens?: Maybe<Tokens_Arr_Rel_Insert_Input>;
  username?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  picture?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  picture?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  picture?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  picture?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns: Array<Users_Update_Column>;
  where?: Maybe<Users_Bool_Exp>;
};

/** ordering options when selecting data from "users" */
export type Users_Order_By = {
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  picture?: Maybe<Order_By>;
  tokens_aggregate?: Maybe<Tokens_Aggregate_Order_By>;
  username?: Maybe<Order_By>;
};

/** primary key columns input for table: "users" */
export type Users_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** columns and relationships of "users_preferences" */
export type Users_Preferences = {
  __typename?: 'users_preferences';
  key: Scalars['String'];
  user: Scalars['uuid'];
  /** An object relationship */
  userByUser: Users;
  value: Scalars['jsonb'];
};


/** columns and relationships of "users_preferences" */
export type Users_PreferencesValueArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "users_preferences" */
export type Users_Preferences_Aggregate = {
  __typename?: 'users_preferences_aggregate';
  aggregate?: Maybe<Users_Preferences_Aggregate_Fields>;
  nodes: Array<Users_Preferences>;
};

/** aggregate fields of "users_preferences" */
export type Users_Preferences_Aggregate_Fields = {
  __typename?: 'users_preferences_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Users_Preferences_Max_Fields>;
  min?: Maybe<Users_Preferences_Min_Fields>;
};


/** aggregate fields of "users_preferences" */
export type Users_Preferences_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Preferences_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "users_preferences" */
export type Users_Preferences_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Users_Preferences_Max_Order_By>;
  min?: Maybe<Users_Preferences_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Users_Preferences_Append_Input = {
  value?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "users_preferences" */
export type Users_Preferences_Arr_Rel_Insert_Input = {
  data: Array<Users_Preferences_Insert_Input>;
  on_conflict?: Maybe<Users_Preferences_On_Conflict>;
};

/** Boolean expression to filter rows from the table "users_preferences". All fields are combined with a logical 'AND'. */
export type Users_Preferences_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Users_Preferences_Bool_Exp>>>;
  _not?: Maybe<Users_Preferences_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Users_Preferences_Bool_Exp>>>;
  key?: Maybe<String_Comparison_Exp>;
  user?: Maybe<Uuid_Comparison_Exp>;
  userByUser?: Maybe<Users_Bool_Exp>;
  value?: Maybe<Jsonb_Comparison_Exp>;
};

/** unique or primary key constraints on table "users_preferences" */
export enum Users_Preferences_Constraint {
  /** unique or primary key constraint */
  UsersPreferencesPkey = 'users_preferences_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Users_Preferences_Delete_At_Path_Input = {
  value?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/**
 * delete the array element with specified index (negative integers count from the
 * end). throws an error if top level container is not an array
 */
export type Users_Preferences_Delete_Elem_Input = {
  value?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Users_Preferences_Delete_Key_Input = {
  value?: Maybe<Scalars['String']>;
};

/** input type for inserting data into table "users_preferences" */
export type Users_Preferences_Insert_Input = {
  key?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['uuid']>;
  userByUser?: Maybe<Users_Obj_Rel_Insert_Input>;
  value?: Maybe<Scalars['jsonb']>;
};

/** aggregate max on columns */
export type Users_Preferences_Max_Fields = {
  __typename?: 'users_preferences_max_fields';
  key?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "users_preferences" */
export type Users_Preferences_Max_Order_By = {
  key?: Maybe<Order_By>;
  user?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Preferences_Min_Fields = {
  __typename?: 'users_preferences_min_fields';
  key?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "users_preferences" */
export type Users_Preferences_Min_Order_By = {
  key?: Maybe<Order_By>;
  user?: Maybe<Order_By>;
};

/** response of any mutation on the table "users_preferences" */
export type Users_Preferences_Mutation_Response = {
  __typename?: 'users_preferences_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Users_Preferences>;
};

/** input type for inserting object relation for remote table "users_preferences" */
export type Users_Preferences_Obj_Rel_Insert_Input = {
  data: Users_Preferences_Insert_Input;
  on_conflict?: Maybe<Users_Preferences_On_Conflict>;
};

/** on conflict condition type for table "users_preferences" */
export type Users_Preferences_On_Conflict = {
  constraint: Users_Preferences_Constraint;
  update_columns: Array<Users_Preferences_Update_Column>;
  where?: Maybe<Users_Preferences_Bool_Exp>;
};

/** ordering options when selecting data from "users_preferences" */
export type Users_Preferences_Order_By = {
  key?: Maybe<Order_By>;
  user?: Maybe<Order_By>;
  userByUser?: Maybe<Users_Order_By>;
  value?: Maybe<Order_By>;
};

/** primary key columns input for table: "users_preferences" */
export type Users_Preferences_Pk_Columns_Input = {
  user: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Users_Preferences_Prepend_Input = {
  value?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "users_preferences" */
export enum Users_Preferences_Select_Column {
  /** column name */
  Key = 'key',
  /** column name */
  User = 'user',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "users_preferences" */
export type Users_Preferences_Set_Input = {
  key?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['uuid']>;
  value?: Maybe<Scalars['jsonb']>;
};

/** update columns of table "users_preferences" */
export enum Users_Preferences_Update_Column {
  /** column name */
  Key = 'key',
  /** column name */
  User = 'user',
  /** column name */
  Value = 'value'
}

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Picture = 'picture',
  /** column name */
  Username = 'username'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  picture?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Picture = 'picture',
  /** column name */
  Username = 'username'
}


/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = (
  { __typename?: 'query_root' }
  & { users: Array<(
    { __typename?: 'users' }
    & Pick<Users, 'email' | 'picture' | 'username'>
  )> }
);

export type SetUsernameMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type SetUsernameMutation = (
  { __typename?: 'mutation_root' }
  & { setUsername?: Maybe<(
    { __typename?: 'SetUsernameOutput' }
    & Pick<SetUsernameOutput, 'error' | 'username'>
  )> }
);

export type IsUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type IsUsernameQuery = (
  { __typename?: 'query_root' }
  & { isUsername?: Maybe<(
    { __typename?: 'IsUsernameOutput' }
    & Pick<IsUsernameOutput, 'exists'>
  )> }
);

export type GetUserPreferencesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserPreferencesQuery = (
  { __typename?: 'query_root' }
  & { users_preferences: Array<(
    { __typename?: 'users_preferences' }
    & Pick<Users_Preferences, 'key' | 'value'>
  )> }
);

export type UpdateUserPreferenceMutationVariables = Exact<{
  key: Scalars['String'];
  value?: Maybe<Scalars['jsonb']>;
}>;


export type UpdateUserPreferenceMutation = (
  { __typename?: 'mutation_root' }
  & { insert_users_preferences?: Maybe<(
    { __typename?: 'users_preferences_mutation_response' }
    & Pick<Users_Preferences_Mutation_Response, 'affected_rows'>
  )> }
);


export const GetUserDocument = gql`
    query GetUser {
  users {
    email
    picture
    username
  }
}
    `;
export type GetUserComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetUserQuery, GetUserQueryVariables>, 'query'>;

    export const GetUserComponent = (props: GetUserComponentProps) => (
      <ApolloReactComponents.Query<GetUserQuery, GetUserQueryVariables> query={GetUserDocument} {...props} />
    );
    
export type GetUserProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetUserQuery, GetUserQueryVariables>
    } & TChildProps;
export function withGetUser<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetUserQuery,
  GetUserQueryVariables,
  GetUserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetUserQuery, GetUserQueryVariables, GetUserProps<TChildProps, TDataName>>(GetUserDocument, {
      alias: 'getUser',
      ...operationOptions
    });
};

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const SetUsernameDocument = gql`
    mutation SetUsername($username: String!) {
  setUsername(username: $username) {
    error
    username
  }
}
    `;
export type SetUsernameMutationFn = ApolloReactCommon.MutationFunction<SetUsernameMutation, SetUsernameMutationVariables>;
export type SetUsernameComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SetUsernameMutation, SetUsernameMutationVariables>, 'mutation'>;

    export const SetUsernameComponent = (props: SetUsernameComponentProps) => (
      <ApolloReactComponents.Mutation<SetUsernameMutation, SetUsernameMutationVariables> mutation={SetUsernameDocument} {...props} />
    );
    
export type SetUsernameProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<SetUsernameMutation, SetUsernameMutationVariables>
    } & TChildProps;
export function withSetUsername<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SetUsernameMutation,
  SetUsernameMutationVariables,
  SetUsernameProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, SetUsernameMutation, SetUsernameMutationVariables, SetUsernameProps<TChildProps, TDataName>>(SetUsernameDocument, {
      alias: 'setUsername',
      ...operationOptions
    });
};

/**
 * __useSetUsernameMutation__
 *
 * To run a mutation, you first call `useSetUsernameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUsernameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUsernameMutation, { data, loading, error }] = useSetUsernameMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSetUsernameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetUsernameMutation, SetUsernameMutationVariables>) {
        return ApolloReactHooks.useMutation<SetUsernameMutation, SetUsernameMutationVariables>(SetUsernameDocument, baseOptions);
      }
export type SetUsernameMutationHookResult = ReturnType<typeof useSetUsernameMutation>;
export type SetUsernameMutationResult = ApolloReactCommon.MutationResult<SetUsernameMutation>;
export type SetUsernameMutationOptions = ApolloReactCommon.BaseMutationOptions<SetUsernameMutation, SetUsernameMutationVariables>;
export const IsUsernameDocument = gql`
    query IsUsername($username: String!) {
  isUsername(username: $username) {
    exists
  }
}
    `;
export type IsUsernameComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<IsUsernameQuery, IsUsernameQueryVariables>, 'query'> & ({ variables: IsUsernameQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const IsUsernameComponent = (props: IsUsernameComponentProps) => (
      <ApolloReactComponents.Query<IsUsernameQuery, IsUsernameQueryVariables> query={IsUsernameDocument} {...props} />
    );
    
export type IsUsernameProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<IsUsernameQuery, IsUsernameQueryVariables>
    } & TChildProps;
export function withIsUsername<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  IsUsernameQuery,
  IsUsernameQueryVariables,
  IsUsernameProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, IsUsernameQuery, IsUsernameQueryVariables, IsUsernameProps<TChildProps, TDataName>>(IsUsernameDocument, {
      alias: 'isUsername',
      ...operationOptions
    });
};

/**
 * __useIsUsernameQuery__
 *
 * To run a query within a React component, call `useIsUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useIsUsernameQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IsUsernameQuery, IsUsernameQueryVariables>) {
        return ApolloReactHooks.useQuery<IsUsernameQuery, IsUsernameQueryVariables>(IsUsernameDocument, baseOptions);
      }
export function useIsUsernameLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IsUsernameQuery, IsUsernameQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<IsUsernameQuery, IsUsernameQueryVariables>(IsUsernameDocument, baseOptions);
        }
export type IsUsernameQueryHookResult = ReturnType<typeof useIsUsernameQuery>;
export type IsUsernameLazyQueryHookResult = ReturnType<typeof useIsUsernameLazyQuery>;
export type IsUsernameQueryResult = ApolloReactCommon.QueryResult<IsUsernameQuery, IsUsernameQueryVariables>;
export const GetUserPreferencesDocument = gql`
    query GetUserPreferences {
  users_preferences {
    key
    value
  }
}
    `;
export type GetUserPreferencesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetUserPreferencesQuery, GetUserPreferencesQueryVariables>, 'query'>;

    export const GetUserPreferencesComponent = (props: GetUserPreferencesComponentProps) => (
      <ApolloReactComponents.Query<GetUserPreferencesQuery, GetUserPreferencesQueryVariables> query={GetUserPreferencesDocument} {...props} />
    );
    
export type GetUserPreferencesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetUserPreferencesQuery, GetUserPreferencesQueryVariables>
    } & TChildProps;
export function withGetUserPreferences<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetUserPreferencesQuery,
  GetUserPreferencesQueryVariables,
  GetUserPreferencesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetUserPreferencesQuery, GetUserPreferencesQueryVariables, GetUserPreferencesProps<TChildProps, TDataName>>(GetUserPreferencesDocument, {
      alias: 'getUserPreferences',
      ...operationOptions
    });
};

/**
 * __useGetUserPreferencesQuery__
 *
 * To run a query within a React component, call `useGetUserPreferencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPreferencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPreferencesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserPreferencesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserPreferencesQuery, GetUserPreferencesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserPreferencesQuery, GetUserPreferencesQueryVariables>(GetUserPreferencesDocument, baseOptions);
      }
export function useGetUserPreferencesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserPreferencesQuery, GetUserPreferencesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserPreferencesQuery, GetUserPreferencesQueryVariables>(GetUserPreferencesDocument, baseOptions);
        }
export type GetUserPreferencesQueryHookResult = ReturnType<typeof useGetUserPreferencesQuery>;
export type GetUserPreferencesLazyQueryHookResult = ReturnType<typeof useGetUserPreferencesLazyQuery>;
export type GetUserPreferencesQueryResult = ApolloReactCommon.QueryResult<GetUserPreferencesQuery, GetUserPreferencesQueryVariables>;
export const UpdateUserPreferenceDocument = gql`
    mutation UpdateUserPreference($key: String!, $value: jsonb) {
  insert_users_preferences(objects: {key: $key, value: $value}, on_conflict: {constraint: users_preferences_pkey, update_columns: [value]}) {
    affected_rows
  }
}
    `;
export type UpdateUserPreferenceMutationFn = ApolloReactCommon.MutationFunction<UpdateUserPreferenceMutation, UpdateUserPreferenceMutationVariables>;
export type UpdateUserPreferenceComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateUserPreferenceMutation, UpdateUserPreferenceMutationVariables>, 'mutation'>;

    export const UpdateUserPreferenceComponent = (props: UpdateUserPreferenceComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateUserPreferenceMutation, UpdateUserPreferenceMutationVariables> mutation={UpdateUserPreferenceDocument} {...props} />
    );
    
export type UpdateUserPreferenceProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UpdateUserPreferenceMutation, UpdateUserPreferenceMutationVariables>
    } & TChildProps;
export function withUpdateUserPreference<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateUserPreferenceMutation,
  UpdateUserPreferenceMutationVariables,
  UpdateUserPreferenceProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateUserPreferenceMutation, UpdateUserPreferenceMutationVariables, UpdateUserPreferenceProps<TChildProps, TDataName>>(UpdateUserPreferenceDocument, {
      alias: 'updateUserPreference',
      ...operationOptions
    });
};

/**
 * __useUpdateUserPreferenceMutation__
 *
 * To run a mutation, you first call `useUpdateUserPreferenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserPreferenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserPreferenceMutation, { data, loading, error }] = useUpdateUserPreferenceMutation({
 *   variables: {
 *      key: // value for 'key'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useUpdateUserPreferenceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserPreferenceMutation, UpdateUserPreferenceMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserPreferenceMutation, UpdateUserPreferenceMutationVariables>(UpdateUserPreferenceDocument, baseOptions);
      }
export type UpdateUserPreferenceMutationHookResult = ReturnType<typeof useUpdateUserPreferenceMutation>;
export type UpdateUserPreferenceMutationResult = ApolloReactCommon.MutationResult<UpdateUserPreferenceMutation>;
export type UpdateUserPreferenceMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserPreferenceMutation, UpdateUserPreferenceMutationVariables>;