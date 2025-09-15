import React from 'react';
import { AppView } from '@tricordarr/components/Views/AppView';
import { ScrollingContentView } from '@tricordarr/components/Views/Content/ScrollingContentView';
import { LfgForm } from '@tricordarr/components/Forms/LfgForm';
import { FezFormValues } from '@tricordarr/libraries/Types/FormValues';
import { FormikHelpers } from 'formik';
import { PaddedContentView } from '@tricordarr/components/Views/Content/PaddedContentView';
import { FezType } from '@tricordarr/libraries/Enums/FezType';
import { useCruise } from '@tricordarr/components/Context/Contexts/CruiseContext';
import { CommonStackComponents, useCommonStack } from '@tricordarr/components/Navigation/CommonScreens';
import { getApparentCruiseDate, getScheduleItemStartEndTime } from '@tricordarr/libraries/DateTime';
import { useFezCreateMutation } from '@tricordarr/components/Queries/Fez/FezMutations';
import { useQueryClient } from '@tanstack/react-query';

interface LfgCreateScreenBaseProps {
  title?: string;
  info?: string;
  location?: string;
  fezType?: FezType;
  duration?: number;
  minCapacity?: number;
  maxCapacity?: number;
}
export const LfgCreateScreenBase = ({
  title = '',
  info = '',
  location = '',
  fezType = FezType.activity,
  duration = 30,
  minCapacity = 2,
  maxCapacity = 2,
}: LfgCreateScreenBaseProps) => {
  const navigation = useCommonStack();
  const fezMutation = useFezCreateMutation();
  const { startDate, adjustedCruiseDayToday } = useCruise();
  const queryClient = useQueryClient();

  const onSubmit = (values: FezFormValues, helpers: FormikHelpers<FezFormValues>) => {
    helpers.setSubmitting(true);
    let { startTime, endTime } = getScheduleItemStartEndTime(values.startDate, values.startTime, values.duration);

    fezMutation.mutate(
      {
        fezContentData: {
          fezType: values.fezType,
          title: values.title,
          info: values.info,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          location: values.location,
          minCapacity: Number(values.minCapacity),
          maxCapacity: Number(values.maxCapacity),
          initialUsers: [],
        },
      },
      {
        onSuccess: async response => {
          navigation.replace(CommonStackComponents.lfgScreen, {
            fezID: response.data.fezID,
          });
          await queryClient.invalidateQueries(['/notification/global']);
        },
        onSettled: () => {
          helpers.setSubmitting(false);
        },
      },
    );
  };

  // @TODO make this form (and the form components) more generic to take types
  const initialValues: FezFormValues = {
    title: title,
    location: location,
    fezType: fezType,
    startDate: getApparentCruiseDate(startDate, adjustedCruiseDayToday),
    duration: String(duration),
    minCapacity: String(minCapacity),
    maxCapacity: String(maxCapacity),
    info: info,
    startTime: {
      hours: new Date().getHours() + 1,
      minutes: 0,
    },
    initialUsers: [],
  };

  return (
    <AppView>
      <ScrollingContentView>
        <PaddedContentView>
          <LfgForm onSubmit={onSubmit} initialValues={initialValues} />
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};
