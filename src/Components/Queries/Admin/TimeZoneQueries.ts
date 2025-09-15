import { TimeZoneChangeData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { useOpenQuery } from '@tricordarr/components/Queries/OpenQuery';

export const useTimeZoneChangesQuery = () => {
  return useOpenQuery<TimeZoneChangeData>('/admin/timezonechanges');
};
