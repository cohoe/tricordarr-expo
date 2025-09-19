import {getAuthHeaders} from '@tricordarr/Libraries/Network/APIClient';
import {TokenStringData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {useTokenAuthMutation} from '@tricordarr/Queries/TokenAuthMutation';
import {useSwiftarrQueryClient} from '@tricordarr/Components/Context/Contexts/SwiftarrQueryClientContext.ts';

interface LoginMutationProps {
  username: string;
  password: string;
}

export const useLoginMutation = () => {
  const {apiPost} = useSwiftarrQueryClient();

  const queryHandler = async ({username, password}: LoginMutationProps) => {
    let authHeaders = getAuthHeaders(username, password);
    return await apiPost<TokenStringData>('/auth/login', undefined, {headers: authHeaders});
  };

  return useTokenAuthMutation(queryHandler);
};
