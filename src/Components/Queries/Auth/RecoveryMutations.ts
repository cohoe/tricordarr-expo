import { useTokenAuthMutation } from '@tricordarr/components/Queries/TokenAuthMutation';
import { TokenStringData, UserRecoveryData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { useSwiftarrQueryClient } from '@tricordarr/components/Context/Contexts/SwiftarrQueryClientContext';

export const useUserRecoveryMutation = () => {
  const { apiPost } = useSwiftarrQueryClient();

  const recoveryHandler = async (recoveryData: UserRecoveryData) => {
    return await apiPost<TokenStringData, UserRecoveryData>('/auth/recovery', recoveryData);
  };

  return useTokenAuthMutation(recoveryHandler);
};
