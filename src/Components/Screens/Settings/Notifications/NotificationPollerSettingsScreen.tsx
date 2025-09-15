import { ScrollingContentView } from '@tricordarr/components/Views/Content/ScrollingContentView';
import React from 'react';
import { AppView } from '@tricordarr/components/Views/AppView';
import { PaddedContentView } from '@tricordarr/components/Views/Content/PaddedContentView';
import { FormikHelpers } from 'formik';
import { useConfig } from '@tricordarr/components/Context/Contexts/ConfigContext';
import { NotificationPollingSettingsForm } from '@tricordarr/components/Forms/Settings/NotificationPollingSettingsForm';
import { NotificationPollingSettingsFormValues } from '@tricordarr/libraries/Types/FormValues';

export const NotificationPollerSettingsScreen = () => {
  const { appConfig, updateAppConfig } = useConfig();

  const handleSubmit = (
    values: NotificationPollingSettingsFormValues,
    helpers: FormikHelpers<NotificationPollingSettingsFormValues>,
  ) => {
    updateAppConfig({
      ...appConfig,
      enableNotificationPolling: values.enableNotificationPolling,
      notificationPollInterval: values.notificationPollIntervalMinutes * 60 * 1000,
    });
    helpers.setSubmitting(false);
    helpers.resetForm({
      values: {
        enableNotificationPolling: values.enableNotificationPolling,
        notificationPollIntervalMinutes: values.notificationPollIntervalMinutes,
      },
    });
  };

  const initialValues: NotificationPollingSettingsFormValues = {
    notificationPollIntervalMinutes: appConfig.notificationPollInterval / 1000 / 60,
    enableNotificationPolling: appConfig.enableNotificationPolling,
  };

  return (
    <AppView>
      <ScrollingContentView>
        <PaddedContentView>
          <NotificationPollingSettingsForm onSubmit={handleSubmit} initialValues={initialValues} />
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};
