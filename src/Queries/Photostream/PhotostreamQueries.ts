import {useTokenAuthPaginationQuery, useTokenAuthQuery} from '@tricordarr/Queries/TokenAuthQuery.ts';
import {PhotostreamListData, PhotostreamLocationData} from '@tricordarr/Libraries/Structs/ControllerStructs.tsx';

export const usePhotostreamQuery = () => {
  return useTokenAuthPaginationQuery<PhotostreamListData>('/photostream');
};

export const usePhotostreamLocationDataQuery = () => {
  return useTokenAuthQuery<PhotostreamLocationData>('/photostream/placenames');
};
