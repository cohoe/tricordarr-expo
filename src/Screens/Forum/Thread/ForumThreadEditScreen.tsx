import {AppView} from '@tricordarr/../../Views/AppView';
import React from 'react';
import {ScrollingContentView} from '@tricordarr/../../Views/Content/ScrollingContentView';
import {PaddedContentView} from '@tricordarr/../../Views/Content/PaddedContentView';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ForumThreadEditForm} from '@tricordarr/../../Forms/Forum/ForumThreadEditForm.tsx';
import {ForumThreadValues} from '@tricordarr/../../../Libraries/Types/FormValues';
import {FormikHelpers} from 'formik';
import {useForumRenameMutation} from '@tricordarr/../../Queries/Forum/ForumThreadMutationQueries.ts';
import {CommonStackComponents, CommonStackParamList} from '@tricordarr/../../Navigation/CommonScreens';
import {useQueryClient} from '@tanstack/react-query';

type Props = NativeStackScreenProps<CommonStackParamList, CommonStackComponents.forumThreadEditScreen>;

export const ForumThreadEditScreen = ({route, navigation}: Props) => {
  const editMutation = useForumRenameMutation();
  const queryClient = useQueryClient();

  const onSubmit = (values: ForumThreadValues, helpers: FormikHelpers<ForumThreadValues>) => {
    editMutation.mutate(
      {
        forumID: route.params.forumData.forumID,
        name: values.title,
      },
      {
        onSuccess: async () => {
          await Promise.all([
            queryClient.invalidateQueries([`/forum/${route.params.forumData.forumID}`]),
            queryClient.invalidateQueries([`/forum/categories/${route.params.forumData.categoryID}`]),
            queryClient.invalidateQueries(['/forum/search']),
          ]);
          navigation.goBack();
        },
        onSettled: () => helpers.setSubmitting(false),
      },
    );
  };
  return (
    <AppView>
      <ScrollingContentView>
        <PaddedContentView>
          <ForumThreadEditForm forumData={route.params.forumData} onSubmit={onSubmit} />
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};
