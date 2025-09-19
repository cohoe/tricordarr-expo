import {UserHeader} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {useTokenAuthQuery} from '@tricordarr/Queries/TokenAuthQuery';

export const useUserFavoritesQuery = (options = {}) => {
  return useTokenAuthQuery<UserHeader[]>('/users/favorites', options);
};
