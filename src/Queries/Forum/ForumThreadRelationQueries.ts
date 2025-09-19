import {useTokenAuthPaginationQuery} from '@tricordarr/Queries/TokenAuthQuery';
import {ForumSearchData} from '@tricordarr/Libraries/Structs/ControllerStructs';

export interface ForumRelationQueryParams {
  start?: number;
  limit?: number;
  cat?: string;
  sort?: 'create' | 'update' | 'title';
}

export enum ForumRelationQueryType {
  owner = 'owner',
  favorites = 'favorites',
  mutes = 'mutes',
  recent = 'recent',
  unread = 'unread',
}

export const useForumRelationQuery = (relation: ForumRelationQueryType, queryParams?: ForumRelationQueryParams) => {
  return useTokenAuthPaginationQuery<ForumSearchData, ForumRelationQueryParams>(
    `/forum/${relation}`,
    undefined,
    queryParams,
  );
};
