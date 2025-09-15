import React, { useEffect } from 'react';
import { AppView } from '@tricordarr/components/Views/AppView';
import { ScrollingContentView } from '@tricordarr/components/Views/Content/ScrollingContentView';
import { PaddedContentView } from '@tricordarr/components/Views/Content/PaddedContentView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonStackComponents, CommonStackParamList } from '@tricordarr/components/Navigation/CommonScreens';
import { PersonalEventForm } from '@tricordarr/components/Forms/PersonalEventForm';
import { FezFormValues } from '@tricordarr/libraries/Types/FormValues';
import { FormikHelpers } from 'formik';
import { addMinutes, differenceInMinutes } from 'date-fns';
import { getEventTimezoneOffset, getScheduleItemStartEndTime } from '@tricordarr/libraries/DateTime';
import { useConfig } from '@tricordarr/components/Context/Contexts/ConfigContext';
import { useQueryClient } from '@tanstack/react-query';
import { FezType } from '@tricordarr/libraries/Enums/FezType';
import { FezData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { useFezUpdateMutation } from '@tricordarr/components/Queries/Fez/FezMutations';

type Props = NativeStackScreenProps<CommonStackParamList, CommonStackComponents.personalEventEditScreen>;
export const PersonalEventEditScreen = ({ navigation, route }: Props) => {
  const { appConfig } = useConfig();
  const updateMutation = useFezUpdateMutation();
  const queryClient = useQueryClient();

  const onSubmit = (values: FezFormValues, helpers: FormikHelpers<FezFormValues>) => {
    let { startTime, endTime } = getScheduleItemStartEndTime(values.startDate, values.startTime, values.duration);

    updateMutation.mutate(
      {
        fezID: route.params.personalEvent.fezID,
        fezContentData: {
          title: values.title,
          info: values.info,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          location: values.location,
          fezType: values.fezType,
          minCapacity: Number(values.minCapacity),
          maxCapacity: Number(values.maxCapacity),
          initialUsers: [],
        },
      },
      {
        onSuccess: async () => {
          const invalidations = FezData.getCacheKeys(route.params.personalEvent.fezID).map(key => {
            return queryClient.invalidateQueries(key);
          });
          await Promise.all([...invalidations, queryClient.invalidateQueries(['/notification/global'])]);
          navigation.goBack();
        },
        onSettled: () => helpers.setSubmitting(false),
      },
    );
  };

  const offset = getEventTimezoneOffset(
    appConfig.portTimeZoneID,
    route.params.personalEvent.startTime,
    route.params.personalEvent.timeZoneID,
  );
  let startDate = new Date(route.params.personalEvent.startTime || new Date());
  startDate = addMinutes(startDate, offset);
  let endDate = new Date(route.params.personalEvent.endTime || new Date());
  endDate = addMinutes(endDate, offset);

  const initialValues: FezFormValues = {
    title: route.params.personalEvent.title,
    location: route.params.personalEvent.location,
    fezType: route.params.personalEvent.fezType,
    startDate: startDate,
    duration: differenceInMinutes(endDate, startDate).toString(),
    minCapacity: route.params.personalEvent.minParticipants.toString(),
    maxCapacity: route.params.personalEvent.maxParticipants.toString(),
    info: route.params.personalEvent.info,
    startTime: {
      hours: startDate.getHours(),
      minutes: startDate.getMinutes(),
    },
    initialUsers: [],
  };

  useEffect(() => {
    navigation.setOptions({
      title: route.params.personalEvent.fezType === FezType.privateEvent ? 'Edit Private Event' : 'Edit Personal Event',
    });
  }, [navigation, route.params.personalEvent.fezType]);

  return (
    <AppView>
      <ScrollingContentView isStack={true}>
        <PaddedContentView padTop={true}>
          <PersonalEventForm initialValues={initialValues} onSubmit={onSubmit} create={false} />
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};
