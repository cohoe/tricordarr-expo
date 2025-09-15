import {AnnouncementData} from '@tricordarr/libraries/Structs/ControllerStructs';
import {useTokenAuthQuery} from '@tricordarr/components/Queries/TokenAuthQuery';

export const useAnnouncementsQuery = (options = {}) => {
  return useTokenAuthQuery<AnnouncementData[]>('/notification/announcements', {
    ...options,
  });
};
