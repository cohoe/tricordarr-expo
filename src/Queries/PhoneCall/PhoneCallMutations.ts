import {useTokenAuthMutation} from '@tricordarr/Queries/TokenAuthMutation';
import {useSwiftarrQueryClient} from '@tricordarr/Components/Context/Contexts/SwiftarrQueryClientContext.ts';

export const usePhoneCallDeclineMutation = () => {
  const {apiPost} = useSwiftarrQueryClient();

  const forumCreateQueryHandler = async ({callID}: {callID: string}) => {
    return await apiPost(`/phone/decline/${callID}`);
  };

  return useTokenAuthMutation(forumCreateQueryHandler);
};
