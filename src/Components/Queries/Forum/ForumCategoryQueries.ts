import {useTokenAuthPaginationQuery, useTokenAuthQuery} from '@tricordarr/components/Queries/TokenAuthQuery';
import {CategoryData} from '@tricordarr/libraries/Structs/ControllerStructs';
import {ForumSort, ForumSortDirection} from '@tricordarr/libraries/Enums/ForumSortFilter';

export const useForumCategoriesQuery = () => {
  return useTokenAuthQuery<CategoryData[]>('/forum/categories');
};

export interface ForumCategoryQueryParams {
  sort?: ForumSort;
  start?: number;
  limit?: number;
  afterdate?: string; // mutually exclusive
  beforedate?: string; // mutually exclusive
  order?: ForumSortDirection;
}

export const useForumCategoryQuery = (categoryId: string, queryParams: ForumCategoryQueryParams = {}) => {
  return useTokenAuthPaginationQuery<CategoryData, ForumCategoryQueryParams>(
    `/forum/categories/${categoryId}`,
    undefined,
    queryParams,
  );
};
