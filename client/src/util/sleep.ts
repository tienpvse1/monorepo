export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve();
      }, ms);
    } catch (error) {
      reject(error);
    }
  });
};
