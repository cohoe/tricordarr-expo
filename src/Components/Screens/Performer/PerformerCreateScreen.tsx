import React from 'react';
import { AppView } from '@tricordarr/components/Views/AppView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '@tricordarr/components/Navigation/Stacks/MainStackNavigator';
import { CommonStackComponents } from '@tricordarr/components/Navigation/CommonScreens';
import { ShadowPerformerForm } from '@tricordarr/components/Forms/Performer/ShadowPerformerForm';
import { EventData, PerformerData, PerformerUploadData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { FormikHelpers } from 'formik';
import { PaddedContentView } from '@tricordarr/components/Views/Content/PaddedContentView';
import { ScrollingContentView } from '@tricordarr/components/Views/Content/ScrollingContentView';
import { usePerformerUpsertMutation } from '@tricordarr/components/Queries/Performer/PerformerMutations';
import { useQueryClient } from '@tanstack/react-query';

type Props = NativeStackScreenProps<MainStackParamList, CommonStackComponents.performerCreateScreen>;

export const PerformerCreateScreen = ({ route, navigation }: Props) => {
  const performerMutation = usePerformerUpsertMutation();
  const queryClient = useQueryClient();

  const onSubmit = (values: PerformerUploadData, helpers: FormikHelpers<PerformerUploadData>) => {
    performerMutation.mutate(
      {
        performerData: values,
        eventID: route.params.eventID,
      },
      {
        onSuccess: async () => {
          const invalidations = EventData.getCacheKeys(route.params.eventID)
            .concat(PerformerData.getCacheKeys())
            .map(key => {
              return queryClient.invalidateQueries(key);
            });
          await Promise.all(invalidations);
          navigation.goBack();
        },
        onSettled: () => helpers.setSubmitting(false),
      },
    );
  };

  const initialValues: PerformerUploadData = {
    name: '',
    isOfficialPerformer: false,
    yearsAttended: [],
    eventUIDs: [],
    photo: {},
  };

  return (
    <AppView>
      <ScrollingContentView>
        <PaddedContentView>
          <ShadowPerformerForm onSubmit={onSubmit} buttonText={'Create'} initialValues={initialValues} />
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};
