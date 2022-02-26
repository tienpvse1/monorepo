import {} from 'axios';
import { db } from './db';

export const getPipeline = async () => {
  const item = await db.pipeline.toArray();
  const result = item[0];
  console.log(result);

  return result;
};
