import {useSwiftarrQueryClient} from '@tricordarr/Components/Context/Contexts/SwiftarrQueryClientContext.ts';
import {useTokenAuthMutation} from '@tricordarr/Queries/TokenAuthMutation.ts';

interface UserFavoriteMutationProps {
  userID: string;
  action: 'favorite' | 'unfavorite';
}

export const useUserFavoriteMutation = () => {
  const {apiPost} = useSwiftarrQueryClient();

  const queryHandler = async ({userID, action}: UserFavoriteMutationProps) => {
    return await apiPost(`/users/${userID}/${action}`);
  };

  return useTokenAuthMutation(queryHandler);
};
