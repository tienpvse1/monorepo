export const getIp = (rawIp: string) => {
  const ip = rawIp.split(':')[3] || '127.0.0.1';
  return ip;
};
