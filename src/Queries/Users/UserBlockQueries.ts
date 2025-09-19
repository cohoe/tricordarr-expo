import {UserHeader} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {useTokenAuthQuery} from '@tricordarr/Queries/TokenAuthQuery';

export const useUserBlocksQuery = (options = {}) => {
  return useTokenAuthQuery<UserHeader[]>('/users/blocks', options);
};
