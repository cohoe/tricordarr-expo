import {useTokenAuthMutation} from '@tricordarr/Queries/TokenAuthMutation';
import {NoteCreateData, NoteData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {useSwiftarrQueryClient} from '@tricordarr/Components/Context/Contexts/SwiftarrQueryClientContext.ts';

interface UserNoteCreateMutationProps {
  userID: string;
  noteData: NoteCreateData;
}

export const useUserNoteCreateMutation = () => {
  const {apiPost} = useSwiftarrQueryClient();

  const createQueryHandler = async ({userID, noteData}: UserNoteCreateMutationProps) => {
    return await apiPost<NoteData, NoteCreateData>(`/users/${userID}/note`, noteData);
  };

  return useTokenAuthMutation(createQueryHandler);
};

export const useUserNoteDeleteMutation = () => {
  const {apiDelete} = useSwiftarrQueryClient();

  const deleteQueryHandler = async ({userID}: {userID: string}) => {
    return await apiDelete(`/users/${userID}/note`);
  };

  return useTokenAuthMutation(deleteQueryHandler);
};
