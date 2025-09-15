import { useTokenAuthPaginationQuery, useTokenAuthQuery } from '@tricordarr/components/Queries/TokenAuthQuery';
import { PhotostreamListData, PhotostreamLocationData } from '@tricordarr/libraries/Structs/ControllerStructs';

export const usePhotostreamQuery = () => {
  return useTokenAuthPaginationQuery<PhotostreamListData>('/photostream');
};

export const usePhotostreamLocationDataQuery = () => {
  return useTokenAuthQuery<PhotostreamLocationData>('/photostream/placenames');
};
