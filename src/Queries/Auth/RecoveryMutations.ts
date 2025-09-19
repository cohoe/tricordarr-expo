import {useTokenAuthMutation} from '@tricordarr/Queries/TokenAuthMutation';
import {TokenStringData, UserRecoveryData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {useSwiftarrQueryClient} from '@tricordarr/Components/Context/Contexts/SwiftarrQueryClientContext.ts';

export const useUserRecoveryMutation = () => {
  const {apiPost} = useSwiftarrQueryClient();

  const recoveryHandler = async (recoveryData: UserRecoveryData) => {
    return await apiPost<TokenStringData, UserRecoveryData>('/auth/recovery', recoveryData);
  };

  return useTokenAuthMutation(recoveryHandler);
};
