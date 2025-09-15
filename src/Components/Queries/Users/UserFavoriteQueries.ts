import {UserHeader} from '@tricordarr/libraries/Structs/ControllerStructs';
import {useTokenAuthQuery} from '@tricordarr/components/Queries/TokenAuthQuery';

export const useUserFavoritesQuery = (options = {}) => {
  return useTokenAuthQuery<UserHeader[]>('/users/favorites', options);
};
