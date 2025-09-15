import React from 'react';
import { AppView } from '@tricordarr/components/Views/AppView';
import { ScrollingContentView } from '@tricordarr/components/Views/Content/ScrollingContentView';
import { PaddedContentView } from '@tricordarr/components/Views/Content/PaddedContentView';
import { ChangePasswordForm } from '@tricordarr/components/Forms/User/ChangePasswordForm';
import { ChangePasswordFormValues } from '@tricordarr/libraries/Types/FormValues';
import { FormikHelpers } from 'formik';
import { Text } from 'react-native-paper';
import { LoadingView } from '@tricordarr/components/Views/Static/LoadingView';
import { useNavigation } from '@react-navigation/native';
import { useUserPasswordMutation } from '@tricordarr/components/Queries/User/UserMutations';
import { useSnackbar } from '@tricordarr/components/Context/Contexts/SnackbarContext';
import { useSwiftarrQueryClient } from '@tricordarr/components/Context/Contexts/SwiftarrQueryClientContext';
import { useUserProfileQuery } from '@tricordarr/components/Queries/User/UserQueries';

export const ChangePasswordScreen = () => {
  const { data: profilePublicData } = useUserProfileQuery();
  const navigation = useNavigation();
  const { serverUrl } = useSwiftarrQueryClient();
  const passwordMutation = useUserPasswordMutation();
  const { setSnackbarPayload } = useSnackbar();

  const onSubmit = (values: ChangePasswordFormValues, helper: FormikHelpers<ChangePasswordFormValues>) => {
    passwordMutation.mutate(
      {
        userPasswordData: {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        },
      },
      {
        onSuccess: () => {
          setSnackbarPayload({ message: 'Successfully changed password!' });
          navigation.goBack();
        },
        onSettled: () => helper.setSubmitting(false),
      },
    );
  };

  if (!profilePublicData) {
    return <LoadingView />;
  }

  return (
    <AppView>
      <ScrollingContentView>
        <PaddedContentView>
          <Text>
            Changing password for user {profilePublicData.header.username} on server {serverUrl}.
          </Text>
        </PaddedContentView>
        <PaddedContentView>
          <ChangePasswordForm onSubmit={onSubmit} />
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};
