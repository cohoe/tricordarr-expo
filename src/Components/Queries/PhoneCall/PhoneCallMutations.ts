import { useTokenAuthMutation } from '@tricordarr/components/Queries/TokenAuthMutation';
import { useSwiftarrQueryClient } from '@tricordarr/components/Context/Contexts/SwiftarrQueryClientContext';

export const usePhoneCallDeclineMutation = () => {
  const { apiPost } = useSwiftarrQueryClient();

  const forumCreateQueryHandler = async ({ callID }: { callID: string; }) => {
    return await apiPost(`/phone/decline/${callID}`);
  };

  return useTokenAuthMutation(forumCreateQueryHandler);
};
