import { ProfilePublicData, UserProfileUploadData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { useTokenAuthMutation } from '@tricordarr/components/Queries/TokenAuthMutation';
import { useSwiftarrQueryClient } from '@tricordarr/components/Context/Contexts/SwiftarrQueryClientContext';

interface userProfileHandlerProps {
  userID?: string;
  profileData: UserProfileUploadData;
}

export const useUserProfileMutation = () => {
  const { apiPost } = useSwiftarrQueryClient();

  const userProfileHandler = async ({ userID, profileData }: userProfileHandlerProps) => {
    const endpoint = userID === undefined ? '/user/profile' : `/user/${userID}/profile`;
    return await apiPost<ProfilePublicData, UserProfileUploadData>(endpoint, profileData);
  };

  return useTokenAuthMutation(userProfileHandler, {});
};
