import { message } from "antd";
import { useQueryClient } from "react-query";
import { UseQueryOptions } from 'react-query';

export const handleMutationResponse = (
  queryKey?: string,
  onSuccess?: (data: any, variables: any, context?: any) => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();
  return {
    onError: onError ? onError : (error) => {
      message.error(`${error}`)
    },
    onSuccess: onSuccess ? onSuccess : (data) => {
      queryClient.invalidateQueries(queryKey)
    },
  };
};

export const queryWithIdProps = (
  id?: string,
  isSuspense = true
): Omit<
  UseQueryOptions<any, unknown, any, string[]>,
  'queryKey' | 'queryFn'
> => {
  return {
    suspense: isSuspense,
    enabled: Boolean(id),
  };
};
