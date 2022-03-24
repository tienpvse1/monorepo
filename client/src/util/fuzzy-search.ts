import Fuse from 'fuse.js';

export const fuseFactory = <T>(data: T[], options: Fuse.IFuseOptions<T>) => {
  return new Fuse(data, options);
};
