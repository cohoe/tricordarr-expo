import { useTokenAuthPaginationQuery, useTokenAuthQuery } from '@tricordarr/components/Queries/TokenAuthQuery';
import { PerformerData, PerformerResponseData } from '@tricordarr/libraries/Structs/ControllerStructs';

export type PerformerType = 'official' | 'shadow';

export const usePerformersQuery = (performerType: PerformerType) => {
  return useTokenAuthPaginationQuery<PerformerResponseData>(`/performer/${performerType}`);
};

export const usePerformerQuery = (performer: string) => {
  return useTokenAuthQuery<PerformerData>(`/performer/${performer}`);
};

export const usePerformerSelfQuery = () => {
  return useTokenAuthQuery<PerformerData>('/performer/self');
};
