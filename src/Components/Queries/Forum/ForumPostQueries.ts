import {useTokenAuthQuery} from '@tricordarr/components/Queries/TokenAuthQuery';
import {PostDetailData} from '@tricordarr/libraries/Structs/ControllerStructs';

export const useForumPostQuery = (postID: string) => {
  return useTokenAuthQuery<PostDetailData>(`/forum/post/${postID}`);
};
