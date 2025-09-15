import { getAuthHeaders } from '@tricordarr/libraries/Network/APIClient';
import { TokenStringData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { useTokenAuthMutation } from '@tricordarr/components/Queries/TokenAuthMutation';
import { useSwiftarrQueryClient } from '@tricordarr/components/Context/Contexts/SwiftarrQueryClientContext';

interface LoginMutationProps {
  username: string;
  password: string;
}

export const useLoginMutation = () => {
  const { apiPost } = useSwiftarrQueryClient();

  const queryHandler = async ({ username, password }: LoginMutationProps) => {
    let authHeaders = getAuthHeaders(username, password);
    return await apiPost<TokenStringData>('/auth/login', undefined, { headers: authHeaders });
  };

  return useTokenAuthMutation(queryHandler);
};
