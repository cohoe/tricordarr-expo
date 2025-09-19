import {DailyThemeData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {useTokenAuthQuery} from '@tricordarr/Queries/TokenAuthQuery';

export const useDailyThemeQuery = (options = {}) => {
  return useTokenAuthQuery<DailyThemeData[]>('/notification/dailythemes', {
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};
