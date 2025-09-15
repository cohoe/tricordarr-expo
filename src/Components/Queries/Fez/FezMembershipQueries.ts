import { FezData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { useTokenAuthMutation } from '@tricordarr/components/Queries/TokenAuthMutation';
import { useSwiftarrQueryClient } from '@tricordarr/components/Context/Contexts/SwiftarrQueryClientContext';

interface FezMembershipMutationProps {
  fezID: string;
  action: 'join' | 'unjoin';
}

export const useFezMembershipMutation = () => {
  const { apiPost } = useSwiftarrQueryClient();

  const queryHandler = async ({ fezID, action }: FezMembershipMutationProps) => {
    return await apiPost<FezData>(`/fez/${fezID}/${action}`);
  };

  return useTokenAuthMutation(queryHandler);
};
