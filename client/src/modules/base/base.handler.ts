import { message } from "antd";
import { useQueryClient } from "react-query";

export const handleMutationResponse = (
  queryKey: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();
  return {
    onError: onError ? onError : (error) => {
      message.error(`${error}`)
    },
    onSuccess: onSuccess ? onSuccess : (data) => {
      queryClient.invalidateQueries(queryKey);
    },
  };
};
