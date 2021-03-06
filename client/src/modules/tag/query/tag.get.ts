import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { useQuery } from 'react-query';
import { ITag } from '../entity/tag.entity';

const { TAG } = controllers;

export const QUERY_TAGS = 'query-tags';
export const QUERY_TAG_BY_ID = 'query-tag-by-id';
export const QUERY_TAG_LIKE = 'query-tag-like';

const getTags = async () => {
  const query = RequestQueryBuilder.create({
    join: [{ field: 'contacts' }],
  }).query(false);
  const { data } = await instance.get<ITag[]>(`${TAG}?${query}`);
  return data;
};

const getTagsLike = async (key: string) => {
  const query = RequestQueryBuilder.create({
    filter: [{ field: 'name', operator: '$cont', value: key }],
    limit: 5,
    join: [{ field: 'contacts' }],
  }).query(false);
  const { data } = await instance.get<ITag[]>(`${TAG}?${query}`);
  return data;
};

const getTagById = async (id: string) => {
  const { data } = await instance.get<ITag>(`${TAG}/${id}`);
  return data;
};

export const useTags = () =>
  useQuery([QUERY_TAGS], getTags, { suspense: true });
export const useTagById = (id: string) =>
  useQuery([QUERY_TAG_BY_ID, id], () => getTagById(id), {
    enabled: Boolean(id),
  });

export const useTagsLike = (key: string) =>
  useQuery([QUERY_TAG_LIKE, key], () => getTagsLike(key), {
    placeholderData: [],
    enabled: Boolean(key),
  });
