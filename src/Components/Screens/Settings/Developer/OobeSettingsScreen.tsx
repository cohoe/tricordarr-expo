import React from 'react';
import { AppView } from '@tricordarr/components/Views/AppView';
import { ScrollingContentView } from '@tricordarr/components/Views/Content/ScrollingContentView';
import { PaddedContentView } from '@tricordarr/components/Views/Content/PaddedContentView';
import { useConfig } from '@tricordarr/components/Context/Contexts/ConfigContext';
import { DataTable, Text } from 'react-native-paper';
import { SettingDataTableRow } from '@tricordarr/components/DataTables/SettingDataTableRow';
import { PrimaryActionButton } from '@tricordarr/components/Buttons/PrimaryActionButton';
import { ListSubheader } from '@tricordarr/components/Lists/ListSubheader';
import { RootStackComponents, useRootStack } from '@tricordarr/components/Navigation/Stacks/RootStackNavigator';
import { useAppTheme } from '@tricordarr/styles/Theme';

export const OobeSettingsScreen = () => {
  const { appConfig, updateAppConfig } = useConfig();
  const navigation = useRootStack();
  const theme = useAppTheme();

  async function resetOobeVersion() {
    updateAppConfig({
      ...appConfig,
      oobeCompletedVersion: 0,
    });
  }

  return (
    <AppView>
      <ScrollingContentView isStack={true}>
        <ListSubheader>Config</ListSubheader>
        <PaddedContentView>
          <DataTable>
            <SettingDataTableRow title={'Expected'} value={String(appConfig.oobeExpectedVersion)} />
            <SettingDataTableRow title={'Completed'} value={String(appConfig.oobeCompletedVersion)} />
          </DataTable>
          <PrimaryActionButton buttonText={'Reset'} onPress={resetOobeVersion} />
        </PaddedContentView>
        <ListSubheader>Debugging</ListSubheader>
        <PaddedContentView padTop={true}>
          <PrimaryActionButton
            buttonText={'Enter OOBE'}
            buttonColor={theme.colors.twitarrNeutralButton}
            onPress={() => navigation.push(RootStackComponents.oobeNavigator)}
          />
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};
