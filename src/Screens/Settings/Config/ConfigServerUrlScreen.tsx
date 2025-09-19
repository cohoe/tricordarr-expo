import React, {useEffect, useState} from 'react';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView';
import {AppView} from '@tricordarr/Components/Views/AppView';
import {ScrollingContentView} from '@tricordarr/Components/Views/Content/ScrollingContentView';
import {useConfig} from '@tricordarr/Components/Context/Contexts/ConfigContext';
import {ServerUrlFormValues} from '@tricordarr/Libraries/Types/FormValues';
import {useAuth} from '@tricordarr/Components/Context/Contexts/AuthContext';
import {Text} from 'react-native-paper';
import {useStyles} from '@tricordarr/Components/Context/Contexts/StyleContext';
import {usePrivilege} from '@tricordarr/Components/Context/Contexts/PrivilegeContext';
import {useQueryClient} from '@tanstack/react-query';
import {useSwiftarrQueryClient} from '@tricordarr/Components/Context/Contexts/SwiftarrQueryClientContext';
import {useHealthQuery} from '@tricordarr/Queries/Client/ClientQueries';
import {RefreshControl} from 'react-native';
import {ServerUrlSettingForm} from '@tricordarr/Components/Forms/Settings/ServerUrlSettingForm';
import {ServerChoices} from '@tricordarr/Libraries/Network/ServerChoices';
import {ServerHealthcheckResultView} from '@tricordarr/Components/Views/Settings/ServerHealthcheckResultView';
import {HttpStatusCode} from 'axios';
import {FormikHelpers} from 'formik';
import {useErrorHandler} from '@tricordarr/Components/Context/Contexts/ErrorHandlerContext';
import {useSnackbar} from '@tricordarr/Components/Context/Contexts/SnackbarContext';
import {CacheManager} from '@georstat/react-native-image-cache';

export const ConfigServerUrlScreen = () => {
  const [serverHealthPassed, setServerHealthPassed] = useState(false);
  const {appConfig, updateAppConfig, preRegistrationMode} = useConfig();
  const {signOut} = useAuth();
  const {commonStyles} = useStyles();
  const {clearPrivileges} = usePrivilege();
  const queryClient = useQueryClient();
  const {disruptionDetected, serverUrl} = useSwiftarrQueryClient();
  const {data: serverHealthData, refetch, isFetching} = useHealthQuery();
  const {hasUnsavedWork} = useErrorHandler();
  const {setSnackbarPayload} = useSnackbar();

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
      await signOut(preRegistrationMode);
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

  return (
    <AppView>
      <ScrollingContentView refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}>
        <PaddedContentView>
          <Text>Do not change this unless instructed to do so by the Twitarr Dev Team or THO.</Text>
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
        {disruptionDetected && (
          <PaddedContentView>
            <Text style={[commonStyles.marginBottomSmall]}>
              Connection disruption detected. This can happen for a number of reasons such as:
            </Text>
            <Text>Leaving the ship</Text>
            <Text>Overcrowded or out-of-range WiFi</Text>
            <Text>Server Issue</Text>
            <Text style={[commonStyles.marginBottomSmall]}>VPN on your device</Text>
            <Text>
              If you believe this should not be the case, press the button below to attempt a server health check. If
              the issue persists for more than an hour, contact the JoCo Cruise Info Desk for assistance.
            </Text>
          </PaddedContentView>
        )}
      </ScrollingContentView>
    </AppView>
  );
};
