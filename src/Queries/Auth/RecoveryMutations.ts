import {useTokenAuthMutation} from '../TokenAuthMutation';
import {TokenStringData, UserRecoveryData} from '../../../Libraries/Structs/ControllerStructs';
import {useSwiftarrQueryClient} from '../../Context/Contexts/SwiftarrQueryClientContext.ts';

export const useUserRecoveryMutation = () => {
  const {apiPost} = useSwiftarrQueryClient();

  const recoveryHandler = async (recoveryData: UserRecoveryData) => {
    return await apiPost<TokenStringData, UserRecoveryData>('/auth/recovery', recoveryData);
  };

  return useTokenAuthMutation(recoveryHandler);
};
