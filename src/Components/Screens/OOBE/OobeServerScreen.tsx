import React, { useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OobeStackComponents, OobeStackParamList } from '@tricordarr/components/Navigation/Stacks/OobeStackNavigator';
import { AppView } from '@tricordarr/components/Views/AppView';
import { ScrollingContentView } from '@tricordarr/components/Views/Content/ScrollingContentView';
import { PaddedContentView } from '@tricordarr/components/Views/Content/PaddedContentView';
import { useConfig } from '@tricordarr/components/Context/Contexts/ConfigContext';
import { ServerUrlFormValues } from '@tricordarr/libraries/Types/FormValues';
import { FormikHelpers } from 'formik';
import { useHealthQuery } from '@tricordarr/components/Queries/Client/ClientQueries';
import { HttpStatusCode } from 'axios';
import { OobeButtonsView } from '@tricordarr/components/Views/OobeButtonsView';
import { OobeServerHeaderTitle } from '@tricordarr/components/Navigation/Components/OobeServerHeaderTitle';
import { ServerHealthcheckResultView } from '@tricordarr/components/Views/Settings/ServerHealthcheckResultView';
import { ServerUrlSettingForm } from '@tricordarr/components/Forms/Settings/ServerUrlSettingForm';
import { RefreshControl } from 'react-native';
import { ServerChoices } from '@tricordarr/libraries/Network/ServerChoices';
import { useErrorHandler } from '@tricordarr/components/Context/Contexts/ErrorHandlerContext';
import { useSwiftarrQueryClient } from '@tricordarr/components/Context/Contexts/SwiftarrQueryClientContext';
import { CacheManager } from '@georstat/react-native-image-cache';
import { useQueryClient } from '@tanstack/react-query';
import { usePrivilege } from '@tricordarr/components/Context/Contexts/PrivilegeContext';
import { useSnackbar } from '@tricordarr/components/Context/Contexts/SnackbarContext';

type Props = NativeStackScreenProps<OobeStackParamList, OobeStackComponents.oobeServerScreen>;

export const OobeServerScreen = ({ navigation }: Props) => {
  const { appConfig, updateAppConfig, preRegistrationMode } = useConfig();
  const { data: serverHealthData, refetch, isFetching } = useHealthQuery();
  const [serverHealthPassed, setServerHealthPassed] = useState(false);
  const getHeaderTitle = useCallback(() => <OobeServerHeaderTitle />, []);
  const { hasUnsavedWork } = useErrorHandler();
  const { clearPrivileges } = usePrivilege();
  const { serverUrl } = useSwiftarrQueryClient();
  const queryClient = useQueryClient();
  const { setSnackbarPayload } = useSnackbar();

  const onSave = async (values: ServerUrlFormValues, formikHelpers: FormikHelpers<ServerUrlFormValues>) => {
    const oldServerUrl = serverUrl;
    await queryClient.cancelQueries(['/client/health']);
    if (preRegistrationMode) {
      updateAppConfig({
        ...appConfig,
        preRegistrationServerUrl: values.serverUrl,
      });
    } else {
      updateAppConfig({
        ...appConfig,
        serverUrl: values.serverUrl,
      });
    }
    refetch().then(() =>
      formikHelpers.resetForm({
        values: {
          serverChoice: ServerChoices.fromUrl(values.serverUrl),
          serverUrl: values.serverUrl,
        },
      }),
    );
    if (oldServerUrl !== values.serverUrl) {
      clearPrivileges();
      queryClient.clear();
      await CacheManager.clearCache();
    }
    setSnackbarPayload(undefined);
  };

  useEffect(() => {
    if (serverHealthData && serverHealthData.status === HttpStatusCode.Ok) {
      setServerHealthPassed(true);
    } else {
      setServerHealthPassed(false);
    }
  }, [serverHealthData]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: getHeaderTitle,
    });
  }, [getHeaderTitle, navigation]);

  return (
    <AppView safeEdges={['bottom']}>
      <ScrollingContentView refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}>
        {!preRegistrationMode && (
          <PaddedContentView>
            <Text>
              Before proceeding ensure that your phone is on ship WiFi and you have disabled any VPNs, private DNS, or
              other network blockers.
            </Text>
          </PaddedContentView>
        )}
        <PaddedContentView>
          <Text>
            Do not change this unless instructed to do so by the Twitarr Dev Team or THO.
            {preRegistrationMode ? (
              <Text> Should be set to Start during pre-registration.</Text>
            ) : (
              <Text> Should be set to Production when on-board.</Text>
            )}
          </Text>
        </PaddedContentView>
        <PaddedContentView>
          <ServerUrlSettingForm
            onSubmit={onSave}
            initialValues={{
              serverChoice: ServerChoices.fromUrl(serverUrl),
              serverUrl: serverUrl,
            }}
          />
        </PaddedContentView>
        {!hasUnsavedWork && (
          <PaddedContentView>
            <ServerHealthcheckResultView serverHealthPassed={serverHealthPassed} />
          </PaddedContentView>
        )}
      </ScrollingContentView>
      <OobeButtonsView
        leftOnPress={() => navigation.goBack()}
        rightOnPress={() => navigation.push(OobeStackComponents.oobeConductScreen)}
        rightDisabled={!serverHealthPassed || isFetching || hasUnsavedWork}
      />
    </AppView>
  );
};
