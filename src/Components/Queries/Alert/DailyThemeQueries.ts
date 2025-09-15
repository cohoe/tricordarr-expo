import {DailyThemeData} from '@tricordarr/libraries/Structs/ControllerStructs';
import {useTokenAuthQuery} from '@tricordarr/components/Queries/TokenAuthQuery';

export const useDailyThemeQuery = (options = {}) => {
  return useTokenAuthQuery<DailyThemeData[]>('/notification/dailythemes', {
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};
