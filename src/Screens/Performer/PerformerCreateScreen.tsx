import React from 'react';
import {AppView} from '@tricordarr/../Views/AppView.tsx';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '@tricordarr/../Navigation/Stacks/MainStackNavigator.tsx';
import {CommonStackComponents} from '@tricordarr/../Navigation/CommonScreens.tsx';
import {ShadowPerformerForm} from '@tricordarr/../Forms/Performer/ShadowPerformerForm.tsx';
import {EventData, PerformerData, PerformerUploadData} from '@tricordarr/../../Libraries/Structs/ControllerStructs.tsx';
import {FormikHelpers} from 'formik';
import {PaddedContentView} from '@tricordarr/../Views/Content/PaddedContentView.tsx';
import {ScrollingContentView} from '@tricordarr/../Views/Content/ScrollingContentView.tsx';
import {usePerformerUpsertMutation} from '@tricordarr/../Queries/Performer/PerformerMutations.ts';
import {useQueryClient} from '@tanstack/react-query';

type Props = NativeStackScreenProps<MainStackParamList, CommonStackComponents.performerCreateScreen>;

export const PerformerCreateScreen = ({route, navigation}: Props) => {
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
