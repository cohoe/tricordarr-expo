import React from 'react';
import {AppView} from '@tricordarr/Components/Views/AppView.tsx';
import {ScrollingContentView} from '@tricordarr/Components/Views/Content/ScrollingContentView.tsx';
import {useConfig} from '@tricordarr/Components/Context/Contexts/ConfigContext.ts';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView.tsx';
import {TimeSettingsForm} from '@tricordarr/Components/Forms/Settings/TimeSettingsForm.tsx';
import {TimeSettingsFormValues} from '@tricordarr/Components/../Libraries/Types/FormValues.ts';
import {FormikHelpers} from 'formik';

export const TimeSettingsScreen = () => {
  const {appConfig, updateAppConfig} = useConfig();
  const onSubmit = (values: TimeSettingsFormValues, helpers: FormikHelpers<TimeSettingsFormValues>) => {
    updateAppConfig({
      ...appConfig,
      manualTimeOffset: Number(values.manualTimeOffset),
    });
    helpers.setSubmitting(false);
  };
  const initialValues: TimeSettingsFormValues = {manualTimeOffset: appConfig.manualTimeOffset.toString()};
  return (
    <AppView>
      <ScrollingContentView isStack={true}>
        <PaddedContentView>
          <TimeSettingsForm onSubmit={onSubmit} initialValues={initialValues} />
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};
