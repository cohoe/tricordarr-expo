import React from 'react';
import {AppView} from '@tricordarr/Components/Views/AppView';
import {ScrollingContentView} from '@tricordarr/Components/Views/Content/ScrollingContentView';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView';
import {ChangePasswordForm} from '@tricordarr/Components/Forms/User/ChangePasswordForm';
import {ChangePasswordFormValues} from '@tricordarr/Libraries/Types/FormValues';
import {FormikHelpers} from 'formik';
import {Text} from 'react-native-paper';
import {LoadingView} from '@tricordarr/Components/Views/Static/LoadingView';
import {useNavigation} from '@react-navigation/native';
import {useUserPasswordMutation} from '@tricordarr/Queries/User/UserMutations';
import {useSnackbar} from '@tricordarr/Components/Context/Contexts/SnackbarContext';
import {useSwiftarrQueryClient} from '@tricordarr/Components/Context/Contexts/SwiftarrQueryClientContext';
import {useUserProfileQuery} from '@tricordarr/Queries/User/UserQueries';

export const ChangePasswordScreen = () => {
  const {data: profilePublicData} = useUserProfileQuery();
  const navigation = useNavigation();
  const {serverUrl} = useSwiftarrQueryClient();
  const passwordMutation = useUserPasswordMutation();
  const {setSnackbarPayload} = useSnackbar();

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
          setSnackbarPayload({message: 'Successfully changed password!'});
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
