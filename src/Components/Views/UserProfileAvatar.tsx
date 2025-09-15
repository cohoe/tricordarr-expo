import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { ProfilePublicData, UserHeader } from '@tricordarr/libraries/Structs/ControllerStructs';
import { useStyles } from '@tricordarr/components/Context/Contexts/StyleContext';
import { StyleSheet, View } from 'react-native';
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import { useUserAvatarMutation, useUserImageDeleteMutation } from '@tricordarr/components/Queries/User/UserAvatarMutations';
import { PERMISSIONS, request as requestPermission } from 'react-native-permissions';
import { APIImage } from '@tricordarr/components/Images/APIImage';
import { useFeature } from '@tricordarr/components/Context/Contexts/FeatureContext';
import { SwiftarrFeature } from '@tricordarr/libraries/Enums/AppFeatures';
import { ImageButtons } from '@tricordarr/components/Buttons/ImageButtons';
import { styleDefaults } from '@tricordarr/styles';
import { useSnackbar } from '@tricordarr/components/Context/Contexts/SnackbarContext';
import { useUsersProfileQuery } from '@tricordarr/components/Queries/Users/UsersQueries';
import { useUserProfileQuery } from '@tricordarr/components/Queries/User/UserQueries';
import { useQueryClient } from '@tanstack/react-query';

interface UserProfileAvatarProps {
  user: ProfilePublicData;
  setRefreshing: Dispatch<SetStateAction<boolean>>;
}

export const UserProfileAvatar = ({ user, setRefreshing }: UserProfileAvatarProps) => {
  const { commonStyles } = useStyles();
  const avatarDeleteMutation = useUserImageDeleteMutation();
  const avatarMutation = useUserAvatarMutation();
  const { setSnackbarPayload } = useSnackbar();
  const usersProfileQuery = useUsersProfileQuery(user.header.userID);
  const { data: profilePublicData } = useUserProfileQuery();
  const { getIsDisabled } = useFeature();
  const queryClient = useQueryClient();

  const styles = StyleSheet.create({
    image: {
      ...commonStyles.roundedBorderLarge,
      ...commonStyles.headerImage,
    },
  });

  const pickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        cropping: true,
        width: styleDefaults.imageSquareCropDimension,
        height: styleDefaults.imageSquareCropDimension,
        includeBase64: true,
        mediaType: 'photo',
      });
      processImage(image);
    } catch (err: any) {
      if (err instanceof Error && err.message !== 'User cancelled image selection') {
        setSnackbarPayload({ message: err.message, messageType: 'error' });
      }
    }
  };

  const takeImage = async () => {
    const permissionStatus = await requestPermission(PERMISSIONS.ANDROID.CAMERA);
    console.log('[UserProfileAvatar.tsx] Camera permission is', permissionStatus);
    try {
      const image = await ImagePicker.openCamera({
        cropping: true,
        width: styleDefaults.imageSquareCropDimension,
        height: styleDefaults.imageSquareCropDimension,
        includeBase64: true,
        mediaType: 'photo',
      });
      processImage(image);
    } catch (err: any) {
      if (err instanceof Error && err.message !== 'User cancelled image selection') {
        setSnackbarPayload({ message: err.message, messageType: 'error' });
      }
    }
  };

  const onSuccess = async () => {
    const invalidations = UserHeader.getCacheKeys(user.header).map(key => {
      return queryClient.invalidateQueries(key);
    });
    await Promise.all(invalidations);
  };

  const processImage = (image: Image) => {
    if (image.data) {
      avatarMutation.mutate(
        {
          image: image.data,
        },
        {
          onSuccess: onSuccess,
        },
      );
    }
  };

  const clearImage = () => {
    avatarDeleteMutation.mutate(
      {},
      {
        onSuccess: onSuccess,
      },
    );
  };

  useEffect(() => {
    setRefreshing(avatarMutation.isLoading || usersProfileQuery.isRefetching);
  }, [avatarMutation.isLoading, setRefreshing, usersProfileQuery.isRefetching]);

  const isSelf = profilePublicData?.header.userID === user.header.userID;

  if (!usersProfileQuery.data) {
    return <></>;
  }

  let thumbPath = `/image/thumb/${user.header.userImage}`;
  let fullPath = `/image/full/${user.header.userImage}`;
  if (!user.header.userImage) {
    thumbPath = `/image/user/identicon/${user.header.userID}`;
    fullPath = `/image/user/identicon/${user.header.userID}`;
  }

  return (
    <View>
      <APIImage thumbPath={thumbPath} fullPath={fullPath} mode={'image'} style={styles.image} />
      {isSelf && !getIsDisabled(SwiftarrFeature.images) && (
        <ImageButtons
          takeImage={takeImage}
          clearImage={clearImage}
          pickImage={pickImage}
          style={commonStyles.justifyCenter}
          disableDelete={!profilePublicData?.header.userImage}
        />
      )}
    </View>
  );
};
