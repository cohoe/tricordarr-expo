import {AppView} from '@tricordarr/../Views/AppView';
import {ScrollingContentView} from '@tricordarr/../Views/Content/ScrollingContentView';
import React from 'react';
import {Text} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {UserNoteForm} from '@tricordarr/../Forms/User/UserNoteForm.tsx';
import {UserNoteFormValues} from '@tricordarr/../../Libraries/Types/FormValues';
import {FormikHelpers} from 'formik';
import {PaddedContentView} from '@tricordarr/../Views/Content/PaddedContentView';
import {useUserNoteCreateMutation, useUserNoteDeleteMutation} from '@tricordarr/../Queries/Users/UserNoteMutations.ts';
import {useQueryClient} from '@tanstack/react-query';
import {PrimaryActionButton} from '@tricordarr/../Buttons/PrimaryActionButton';
import {useAppTheme} from '@tricordarr/../../styles/Theme';
import {useStyles} from '@tricordarr/../Context/Contexts/StyleContext';
import {CommonStackComponents, CommonStackParamList} from '@tricordarr/../Navigation/CommonScreens';
import {UserHeader} from '@tricordarr/../../Libraries/Structs/ControllerStructs.tsx';

type Props = NativeStackScreenProps<CommonStackParamList, CommonStackComponents.userPrivateNoteScreen>;

export const UserPrivateNoteScreen = ({route, navigation}: Props) => {
  const createMutation = useUserNoteCreateMutation();
  const deleteMutation = useUserNoteDeleteMutation();
  const initialValues: UserNoteFormValues = {
    note: route.params.user.note || '',
  };
  const queryClient = useQueryClient();
  const theme = useAppTheme();
  const {commonStyles} = useStyles();
  const onSubmit = (values: UserNoteFormValues, helpers: FormikHelpers<UserNoteFormValues>) => {
    helpers.setSubmitting(true);
    createMutation.mutate(
      {
        userID: route.params.user.header.userID,
        noteData: values,
      },
      {
        onSuccess: () => {
          const invalidations = UserHeader.getCacheKeys(route.params.user.header).map(key => {
            return queryClient.invalidateQueries(key);
          });
          Promise.all(invalidations);
          navigation.goBack();
        },
        onSettled: () => helpers.setSubmitting(false),
      },
    );
  };
  const handleDelete = () => {
    deleteMutation.mutate(
      {
        userID: route.params.user.header.userID,
      },
      {
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
    <AppView>
      <ScrollingContentView>
        <PaddedContentView>
          <Text>Add a note about this user, visible only to you.</Text>
        </PaddedContentView>
        <PaddedContentView>
          <UserNoteForm initialValues={initialValues} onSubmit={onSubmit} />
          {route.params.user.note && (
            <PrimaryActionButton
              buttonColor={theme.colors.twitarrNegativeButton}
              disabled={deleteMutation.isLoading}
              isLoading={deleteMutation.isLoading}
              viewStyle={[commonStyles.marginTop]}
              onPress={handleDelete}
              buttonText={'Delete'}
            />
          )}
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};
