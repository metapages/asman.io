import React from 'react'
import { QueryResult } from 'react-apollo'
import { NetworkStatus, ApolloError } from 'apollo-client'
import { Loader, Message } from 'semantic-ui-react'
import _ from "underscore";

export interface LoadOrErrorProps<Q, V> {
  result: QueryResult<Q, V>;
  children?: (
    result: Omit<QueryResult<Q, V>, "loading" | "error">
  ) => JSX.Element | null;
}

const loadingNetworkStatuses = [
  NetworkStatus.loading,
  NetworkStatus.fetchMore,
  NetworkStatus.poll,
  NetworkStatus.refetch,
  NetworkStatus.setVariables,
];
export const handleResult = <Q, V>(
  result: QueryResult<Q, V>
): React.ReactElement | null => {
  const { loading, error, networkStatus } = result;

  if (loading || _.some(loadingNetworkStatuses, (s:NetworkStatus) => s === networkStatus)) {
    return <Loader active />;
  }
  if (error) {
    // if auth failed, redirect to /logout, the server will take over redirects
    if (
      JSON.stringify(error).indexOf(
        "Authentication hook unauthorized this request"
      ) > -1
    ) {
    }

    return (
      <Message negative>
        <Message.Header>Error</Message.Header>
        <p>{`${JSON.stringify(error)}`}</p>
      </Message>
    );
  }
  return null;
};

export function ResultHandler<Q, V>({
  result,
  children,
}: LoadOrErrorProps<Q, V>): React.ReactElement | null {
  const comp = handleResult(result);
  return comp ? comp : children?.(result) || null;
}

export const classifyResult = <Q,V>(result: QueryResult<Q,V>): {ok?: boolean, loading?: boolean, error?: ApolloError} => {
    const {loading, error, networkStatus} = result

    if (loading || _.some(loadingNetworkStatuses, (s:NetworkStatus) => s === networkStatus)) {
        return {loading: true}
    }
    if (error) {
        return {error: result.error}
    }
    return {ok: true}
}
