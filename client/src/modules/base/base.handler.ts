import { UseQueryOptions } from 'react-query';

export const handleMutationResponse = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  return {
    onError: onError ? onError : (error) => console.log('error occur'),
    onSuccess: onSuccess ? onSuccess : (data) => console.log(data),
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
