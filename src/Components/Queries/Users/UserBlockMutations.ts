import { useSwiftarrQueryClient } from '@tricordarr/components/Context/Contexts/SwiftarrQueryClientContext';
import { useTokenAuthMutation } from '@tricordarr/components/Queries/TokenAuthMutation';

interface UserBlockMutationProps {
  userID: string;
  action: 'block' | 'unblock';
}

export const useUserBlockMutation = () => {
  const { apiPost } = useSwiftarrQueryClient();

  const queryHandler = async ({ userID, action }: UserBlockMutationProps) => {
    return await apiPost(`/users/${userID}/${action}`);
  };

  return useTokenAuthMutation(queryHandler);
};
