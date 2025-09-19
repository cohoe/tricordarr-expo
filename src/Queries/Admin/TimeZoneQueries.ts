import {TimeZoneChangeData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {useOpenQuery} from '@tricordarr/Queries/OpenQuery.ts';

export const useTimeZoneChangesQuery = () => {
  return useOpenQuery<TimeZoneChangeData>('/admin/timezonechanges');
};
