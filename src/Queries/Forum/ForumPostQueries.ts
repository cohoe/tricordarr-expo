import {useTokenAuthQuery} from '@tricordarr/Queries/TokenAuthQuery';
import {PostDetailData} from '@tricordarr/Libraries/Structs/ControllerStructs';

export const useForumPostQuery = (postID: string) => {
  return useTokenAuthQuery<PostDetailData>(`/forum/post/${postID}`);
};
