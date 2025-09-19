import {ScrollingContentView} from '@tricordarr/Components/Views/Content/ScrollingContentView';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView';
import {Text} from 'react-native-paper';
import {AppView} from '@tricordarr/Components/Views/AppView';
import React from 'react';
import {LoadingView} from '@tricordarr/Components/Views/Static/LoadingView';
import {useNavigation} from '@react-navigation/native';
import {ChangeUsernameFormValues} from '@tricordarr/Components/../Libraries/Types/FormValues';
import {FormikHelpers} from 'formik';
import {ChangeUsernameForm} from '@tricordarr/Components/Forms/User/ChangeUsernameForm.tsx';
import {useUserUsernameMutation} from '@tricordarr/Queries/User/UserMutations.ts';
import {useSnackbar} from '@tricordarr/Components/Context/Contexts/SnackbarContext.ts';
import {useSwiftarrQueryClient} from '@tricordarr/Components/Context/Contexts/SwiftarrQueryClientContext.ts';
import {useUserProfileQuery} from '@tricordarr/Queries/User/UserQueries.ts';
import {UserHeader} from '@tricordarr/Components/../Libraries/Structs/ControllerStructs.tsx';
import {useQueryClient} from '@tanstack/react-query';

export const ChangeUsernameScreen = () => {
  const {data: profilePublicData} = useUserProfileQuery();
  const navigation = useNavigation();
  const {serverUrl} = useSwiftarrQueryClient();
  const usernameMutation = useUserUsernameMutation();
  const queryClient = useQueryClient();

  const {setSnackbarPayload} = useSnackbar();

  const onSubmit = (values: ChangeUsernameFormValues, helper: FormikHelpers<ChangeUsernameFormValues>) => {
    usernameMutation.mutate(
      {
        userUsernameData: values,
      },
      {
        onSuccess: async () => {
          const invalidations = UserHeader.getCacheKeys(profilePublicData?.header).map(key => {
            return queryClient.invalidateQueries(key);
          });
          await Promise.all(invalidations);
          setSnackbarPayload({message: 'Successfully changed username!'});
          navigation.goBack();
        },
        onSettled: () => {
          helper.setSubmitting(false);
        },
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
            Changing username for user {profilePublicData.header.username} on server {serverUrl}.
          </Text>
        </PaddedContentView>
        <PaddedContentView>
          <Text>To prevent abuse, you're only allowed to change your username once per day. Choose wisely!</Text>
        </PaddedContentView>
        <PaddedContentView>
          <ChangeUsernameForm onSubmit={onSubmit} />
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};
