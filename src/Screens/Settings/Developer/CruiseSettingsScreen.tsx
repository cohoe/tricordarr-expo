import React, {useState} from 'react';
import {RefreshControl} from 'react-native';
import {AppView} from '@tricordarr/../../Views/AppView';
import {PaddedContentView} from '@tricordarr/../../Views/Content/PaddedContentView';
import {CruiseSettingsForm} from '@tricordarr/../../Forms/Settings/CruiseSettingsForm.tsx';
import {useConfig} from '@tricordarr/../../Context/Contexts/ConfigContext';
import {CruiseSettingsFormValues, PreRegistrationSettingsFormValues} from '@tricordarr/../../../Libraries/Types/FormValues';
import {FormikHelpers} from 'formik';
import {PrimaryActionButton} from '@tricordarr/../../Buttons/PrimaryActionButton.tsx';
import {useAppTheme} from '@tricordarr/../../../styles/Theme.ts';
import {ScrollingContentView} from '@tricordarr/../../Views/Content/ScrollingContentView.tsx';
import {useClientConfigQuery} from '@tricordarr/../../Queries/Client/ClientQueries.ts';
import {ListSubheader} from '@tricordarr/../../Lists/ListSubheader.tsx';
import {useCruise} from '@tricordarr/../../Context/Contexts/CruiseContext.ts';
import {SettingDataTableRow} from '@tricordarr/../../DataTables/SettingDataTableRow.tsx';
import {DataTable} from 'react-native-paper';
import {PreRegistrationSettingsForm} from '@tricordarr/../../Forms/Settings/PreRegistrationSettingsForm.tsx';

export const CruiseSettingsScreen = () => {
  const {appConfig, updateAppConfig} = useConfig();
  const {data, refetch} = useClientConfigQuery({enabled: false});
  const theme = useAppTheme();
  const [refreshing, setRefreshing] = useState(false);
  const {cruiseDayToday, adjustedCruiseDayToday, cruiseDayIndex, adjustedCruiseDayIndex} = useCruise();

  const initialValues: CruiseSettingsFormValues = {
    portTimeZoneID: appConfig.portTimeZoneID,
    cruiseLength: appConfig.cruiseLength.toString(),
    startDate: appConfig.cruiseStartDate,
    schedBaseUrl: appConfig.schedBaseUrl,
  };

  const preRegistrationInitialValues: PreRegistrationSettingsFormValues = {
    preRegistrationServerUrl: appConfig.preRegistrationServerUrl,
    preRegistrationEndDate: appConfig.preRegistrationEndDate,
  };

  const onSubmit = (values: CruiseSettingsFormValues, helpers: FormikHelpers<CruiseSettingsFormValues>) => {
    let startDate = values.startDate;
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    updateAppConfig({
      ...appConfig,
      portTimeZoneID: values.portTimeZoneID,
      cruiseLength: Number(values.cruiseLength),
      cruiseStartDate: startDate,
      schedBaseUrl: values.schedBaseUrl,
    });
    helpers.setSubmitting(false);
    helpers.resetForm({
      values: {
        portTimeZoneID: values.portTimeZoneID,
        cruiseLength: values.cruiseLength,
        startDate: values.startDate,
        schedBaseUrl: values.schedBaseUrl,
      },
    });
  };

  const onPreRegistrationSubmit = (
    values: PreRegistrationSettingsFormValues,
    helpers: FormikHelpers<PreRegistrationSettingsFormValues>,
  ) => {
    updateAppConfig({
      ...appConfig,
      preRegistrationServerUrl: values.preRegistrationServerUrl,
      preRegistrationEndDate: values.preRegistrationEndDate,
    });
    helpers.setSubmitting(false);
    helpers.resetForm({
      values: {
        preRegistrationServerUrl: values.preRegistrationServerUrl,
        preRegistrationEndDate: values.preRegistrationEndDate,
      },
    });
  };

  const reloadClientConfig = async () => {
    setRefreshing(true);
    await refetch();
    if (data) {
      const [year, month, day] = data.spec.cruiseStartDate.split('-').map(Number);
      updateAppConfig({
        ...appConfig,
        cruiseLength: data.spec.cruiseLength,
        cruiseStartDate: new Date(year, month - 1, day),
        oobeExpectedVersion: data.spec.oobeVersion,
        portTimeZoneID: data.spec.portTimeZoneID,
        schedBaseUrl: data.spec.schedBaseUrl,
      });
    }
    setRefreshing(false);
  };

  return (
    <AppView>
      <ScrollingContentView isStack={true} refreshControl={<RefreshControl refreshing={refreshing} enabled={false} />}>
        <ListSubheader>General</ListSubheader>
        <PaddedContentView padTop={true} padBottom={false}>
          <PrimaryActionButton
            buttonText={'Reload From Server'}
            onPress={reloadClientConfig}
            buttonColor={theme.colors.twitarrNeutralButton}
          />
        </PaddedContentView>
        <PaddedContentView>
          <CruiseSettingsForm onSubmit={onSubmit} initialValues={initialValues} />
        </PaddedContentView>
        <ListSubheader>Internal State</ListSubheader>
        <PaddedContentView>
          <DataTable>
            <SettingDataTableRow title={'Cruise Day Today'} value={cruiseDayToday.toString()} reverseSplit={true} />
            <SettingDataTableRow
              title={'Adjusted Cruise Day Today'}
              value={adjustedCruiseDayToday.toString()}
              reverseSplit={true}
            />
            <SettingDataTableRow title={'Cruise Day Index'} value={cruiseDayIndex.toString()} reverseSplit={true} />
            <SettingDataTableRow
              title={'Adjusted Cruise Day Index'}
              value={adjustedCruiseDayIndex.toString()}
              reverseSplit={true}
            />
            <SettingDataTableRow title={'Latest Version'} value={data?.spec.latestVersion} reverseSplit={true} />
          </DataTable>
        </PaddedContentView>
        <ListSubheader>Pre-Registration</ListSubheader>
        <PaddedContentView padTop={true}>
          <PreRegistrationSettingsForm
            onSubmit={onPreRegistrationSubmit}
            initialValues={preRegistrationInitialValues}
          />
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};
