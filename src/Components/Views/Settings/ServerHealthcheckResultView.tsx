import { Text } from 'react-native-paper';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppIcon } from '@tricordarr/components/Icons/AppIcon';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { useStyles } from '@tricordarr/components/Context/Contexts/StyleContext';
import { useAppTheme } from '@tricordarr/styles/Theme';
import { useHealthQuery } from '@tricordarr/components/Queries/Client/ClientQueries';
import { RelativeTimeTag } from '@tricordarr/components/Text/Tags/RelativeTimeTag';

interface ServerHealthcheckResultViewProps {
  serverHealthPassed: boolean;
}

export const ServerHealthcheckResultView = ({ serverHealthPassed }: ServerHealthcheckResultViewProps) => {
  const { commonStyles } = useStyles();
  const { data: serverHealthData, dataUpdatedAt, errorUpdatedAt, isError, isSuccess } = useHealthQuery();
  const theme = useAppTheme();

  const styles = StyleSheet.create({
    viewContainer: {
      ...commonStyles.alignItemsCenter,
    },
  });

  // https://github.com/TanStack/query/discussions/1229
  const updatedAt = isError ? new Date(errorUpdatedAt) : isSuccess ? new Date(dataUpdatedAt) : undefined;

  return (
    <View style={styles.viewContainer}>
      {serverHealthPassed ? (
        <AppIcon icon={AppIcons.passed} size={100} color={theme.colors.twitarrPositiveButton} />
      ) : (
        <AppIcon icon={AppIcons.error} size={100} color={theme.colors.twitarrNegativeButton} />
      )}
      {serverHealthPassed && <Text>Server check passed!</Text>}
      {!serverHealthPassed && serverHealthData?.error && (
        <Text>
          The Twitarr server is down. Try again later. Error: {serverHealthData.reason} ({serverHealthData.status})
        </Text>
      )}
      {!serverHealthPassed && (
        <Text>
          Server check failed. Ensure your phone is on ship wifi, all VPNs and DNS interceptors are disabled, and the
          server URL is correct. If the issue persists go to the JoCo Cruise Info Desk for assistance.
        </Text>
      )}
      {updatedAt && (
        <Text>
          Checked <RelativeTimeTag date={updatedAt} />
        </Text>
      )}
    </View>
  );
};
