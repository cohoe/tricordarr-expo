import React from 'react';
import {AppView} from '@tricordarr/../Views/AppView.tsx';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommonStackComponents, CommonStackParamList} from '@tricordarr/../Navigation/CommonScreens.tsx';
import {usePerformerUpsertMutation} from '@tricordarr/../Queries/Performer/PerformerMutations.ts';
import {EventData, PerformerData, PerformerUploadData} from '@tricordarr/../../Libraries/Structs/ControllerStructs.tsx';
import {FormikHelpers} from 'formik';
import {useQueryClient} from '@tanstack/react-query';
import {ShadowPerformerForm} from '@tricordarr/../Forms/Performer/ShadowPerformerForm.tsx';
import {ScrollingContentView} from '@tricordarr/../Views/Content/ScrollingContentView.tsx';
import {PaddedContentView} from '@tricordarr/../Views/Content/PaddedContentView.tsx';

type Props = NativeStackScreenProps<CommonStackParamList, CommonStackComponents.performerEditScreen>;

export const PerformerEditScreen = ({navigation, route}: Props) => {
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
          const invalidations = PerformerData.getCacheKeys(route.params.performerData.header.id)
            .map(key => {
              return queryClient.invalidateQueries(key);
            })
            .concat(
              EventData.getCacheKeys(route.params.eventID).map(key => {
                return queryClient.invalidateQueries(key);
              }),
            );
          await Promise.all(invalidations);
          navigation.goBack();
        },
        onSettled: () => helpers.setSubmitting(false),
      },
    );
  };

  const initialValues: PerformerUploadData = {
    ...route.params.performerData,
    name: route.params.performerData.header.name,
    photo: {
      filename: route.params.performerData.header.photo,
    },
    isOfficialPerformer: route.params.performerData.header.isOfficialPerformer,
    eventUIDs: route.params.performerData.events.map(e => e.eventID),
  };

  return (
    <AppView>
      <ScrollingContentView isStack={true}>
        <PaddedContentView padTop={true}>
          <ShadowPerformerForm onSubmit={onSubmit} initialValues={initialValues} buttonText={'Save'} />
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};
