import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppView} from '@tricordarr/Components/Views/AppView';
import {UserHeader, UserProfileUploadData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {ScrollingContentView} from '@tricordarr/Components/Views/Content/ScrollingContentView';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView';
import {UserProfileForm} from '@tricordarr/Components/Forms/User/UserProfileForm';
import {UserProfileFormValues} from '@tricordarr/Libraries/Types/FormValues';
import {FormikHelpers} from 'formik';
import {useUserProfileMutation} from '@tricordarr/Queries/User/UserProfileMutations';
import {useQueryClient} from '@tanstack/react-query';
import {DinnerTeam} from '@tricordarr/Libraries/Enums/DinnerTeam';
import {CommonStackComponents, CommonStackParamList} from '@tricordarr/Components/Navigation/CommonScreens';

type Props = NativeStackScreenProps<CommonStackParamList, CommonStackComponents.userProfileEditScreen>;

export const UserProfileEditScreen = ({route, navigation}: Props) => {
  const profileMutation = useUserProfileMutation();
  const queryClient = useQueryClient();
  const initialValues: UserProfileFormValues = {
    displayName: route.params.user.header.displayName || '',
    realName: route.params.user.realName,
    preferredPronoun: route.params.user.header.preferredPronoun || '',
    homeLocation: route.params.user.homeLocation,
    roomNumber: route.params.user.roomNumber,
    email: route.params.user.email,
    message: route.params.user.message,
    about: route.params.user.about,
    dinnerTeam: route.params.user.dinnerTeam || '',
  };

  const onSubmit = (values: UserProfileFormValues, helpers: FormikHelpers<UserProfileFormValues>) => {
    helpers.setSubmitting(true);
    const postData: UserProfileUploadData = {
      displayName: values.displayName,
      realName: values.realName,
      homeLocation: values.homeLocation,
      roomNumber: values.roomNumber,
      email: values.email,
      message: values.message,
      about: values.about,
      preferredPronoun: values.preferredPronoun,
      ...(values.dinnerTeam ? {dinnerTeam: values.dinnerTeam as DinnerTeam} : undefined),
      header: route.params.user.header,
    };
    profileMutation.mutate(
      {
        profileData: postData,
      },
      {
        onSettled: () => helpers.setSubmitting(false),
        onSuccess: async () => {
          const invalidations = UserHeader.getCacheKeys(route.params.user.header).map(key => {
            return queryClient.invalidateQueries(key);
          });
          await Promise.all(invalidations);
          navigation.goBack();
        },
      },
    );
  };

  return (
    <AppView safeEdges={route.params.oobe ? ['bottom'] : []}>
      <ScrollingContentView>
        <PaddedContentView>
          <UserProfileForm initialValues={initialValues} onSubmit={onSubmit} />
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};
