import {UserHeader} from '@tricordarr/libraries/Structs/ControllerStructs';
import {useTokenAuthQuery} from '@tricordarr/components/Queries/TokenAuthQuery';

export const useUserMutesQuery = (options = {}) => {
  return useTokenAuthQuery<UserHeader[]>('/users/mutes', options);
};
