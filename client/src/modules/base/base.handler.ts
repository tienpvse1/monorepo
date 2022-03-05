export const handleMutationResponse = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  return {
    onError: onError ? onError : (error) => console.log('error occur'),
    onSuccess: onSuccess ? onSuccess : (data) => console.log(data),
  };
};
