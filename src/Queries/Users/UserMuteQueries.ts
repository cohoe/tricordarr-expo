import {UserHeader} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {useTokenAuthQuery} from '@tricordarr/Queries/TokenAuthQuery';

export const useUserMutesQuery = (options = {}) => {
  return useTokenAuthQuery<UserHeader[]>('/users/mutes', options);
};
