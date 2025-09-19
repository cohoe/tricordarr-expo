import {useTokenAuthPaginationQuery, useTokenAuthQuery} from '@tricordarr/Queries/TokenAuthQuery';
import {PhotostreamListData, PhotostreamLocationData} from '@tricordarr/Libraries/Structs/ControllerStructs';

export const usePhotostreamQuery = () => {
  return useTokenAuthPaginationQuery<PhotostreamListData>('/photostream');
};

export const usePhotostreamLocationDataQuery = () => {
  return useTokenAuthQuery<PhotostreamLocationData>('/photostream/placenames');
};
