import {FezData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {useTokenAuthMutation} from '@tricordarr/Queries/TokenAuthMutation';
import {useSwiftarrQueryClient} from '@tricordarr/Components/Context/Contexts/SwiftarrQueryClientContext.ts';

interface FezMembershipMutationProps {
  fezID: string;
  action: 'join' | 'unjoin';
}

export const useFezMembershipMutation = () => {
  const {apiPost} = useSwiftarrQueryClient();

  const queryHandler = async ({fezID, action}: FezMembershipMutationProps) => {
    return await apiPost<FezData>(`/fez/${fezID}/${action}`);
  };

  return useTokenAuthMutation(queryHandler);
};
