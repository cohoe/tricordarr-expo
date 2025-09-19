import {AnnouncementData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {useTokenAuthQuery} from '@tricordarr/Queries/TokenAuthQuery';

export const useAnnouncementsQuery = (options = {}) => {
  return useTokenAuthQuery<AnnouncementData[]>('/notification/announcements', {
    ...options,
  });
};
