export const isExpired = (date: Date): boolean => {
  return new Date(date) < new Date();
};

export const generateExpireDate = () => {
  return new Date(Date.now() + 1000 * 60 * 30);
};
