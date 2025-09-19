import {AppView} from '@tricordarr/Components/Views/AppView';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView';
import {PersonalEventForm} from '@tricordarr/Components/Forms/PersonalEventForm';
import {ScrollingContentView} from '@tricordarr/Components/Views/Content/ScrollingContentView';
import React from 'react';
import {FezFormValues} from '@tricordarr/Libraries/Types/FormValues';
import {useQueryClient} from '@tanstack/react-query';
import {FormikHelpers} from 'formik';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommonStackComponents, CommonStackParamList} from '@tricordarr/Components/Navigation/CommonScreens';
import {useCruise} from '@tricordarr/Components/Context/Contexts/CruiseContext';
import {getApparentCruiseDate, getScheduleItemStartEndTime} from '@tricordarr/Libraries/DateTime';
import {FezType} from '@tricordarr/Libraries/Enums/FezType';
import {FezData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {useFezCreateMutation} from '@tricordarr/Queries/Fez/FezMutations';

type Props = NativeStackScreenProps<CommonStackParamList, CommonStackComponents.personalEventCreateScreen>;
export const PersonalEventCreateScreen = ({navigation, route}: Props) => {
  const createMutation = useFezCreateMutation();
  const queryClient = useQueryClient();
  const {startDate, adjustedCruiseDayToday} = useCruise();

  const onSubmit = (values: FezFormValues, helpers: FormikHelpers<FezFormValues>) => {
    let {startTime, endTime} = getScheduleItemStartEndTime(values.startDate, values.startTime, values.duration);

    createMutation.mutate(
      {
        fezContentData: {
          title: values.title,
          info: values.info,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          location: values.location,
          minCapacity: 0,
          maxCapacity: 0,
          initialUsers: values.initialUsers.map(u => u.userID),
          fezType: values.initialUsers.length > 0 ? FezType.privateEvent : FezType.personalEvent,
        },
      },
      {
        onSuccess: async () => {
          const invalidations = FezData.getCacheKeys().map(key => {
            return queryClient.invalidateQueries(key);
          });
          await Promise.all(invalidations);
          navigation.goBack();
        },
        onSettled: () => helpers.setSubmitting(false),
      },
    );
  };
  const initialValues: FezFormValues = {
    title: '',
    startDate: getApparentCruiseDate(
      startDate,
      route.params.cruiseDay !== undefined ? route.params.cruiseDay : adjustedCruiseDayToday,
    ),
    duration: '30',
    info: '',
    startTime: {
      hours: new Date().getHours() + 1,
      minutes: 0,
    },
    fezType: FezType.personalEvent,
    minCapacity: '0',
    maxCapacity: '0',
    initialUsers: [],
    location: '',
  };
  return (
    <AppView>
      <ScrollingContentView isStack={true}>
        <PaddedContentView padTop={true}>
          <PersonalEventForm initialValues={initialValues} onSubmit={onSubmit} />
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};
