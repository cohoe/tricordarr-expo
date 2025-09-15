import {UserHeader} from '@tricordarr/libraries/Structs/ControllerStructs';
import {useTokenAuthQuery} from '@tricordarr/components/Queries/TokenAuthQuery';

export const useUserBlocksQuery = (options = {}) => {
  return useTokenAuthQuery<UserHeader[]>('/users/blocks', options);
};
