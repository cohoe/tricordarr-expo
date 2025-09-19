import {useTokenAuthMutation} from '../TokenAuthMutation';
import {ImageUploadData, UserHeader} from '../../../Libraries/Structs/ControllerStructs';
import {useSwiftarrQueryClient} from '../../Context/Contexts/SwiftarrQueryClientContext.ts';

export const useUserAvatarMutation = () => {
  const {apiPost} = useSwiftarrQueryClient();

  const imageUploadHandler = async (imageUploadData: ImageUploadData) => {
    return await apiPost<UserHeader, ImageUploadData>('/user/image', imageUploadData);
  };

  return useTokenAuthMutation(imageUploadHandler);
};

export const useUserImageDeleteMutation = () => {
  const {apiDelete} = useSwiftarrQueryClient();

  const imageDeleteHandler = async ({userID}: {userID?: string}) => {
    const endpoint = userID ? '/user/:userID/image' : '/user/image';
    return await apiDelete(endpoint);
  };

  return useTokenAuthMutation(imageDeleteHandler);
};
