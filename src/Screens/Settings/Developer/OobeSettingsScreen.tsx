import React from 'react';
import {AppView} from '@tricordarr/Components/Views/AppView';
import {ScrollingContentView} from '@tricordarr/Components/Views/Content/ScrollingContentView';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView';
import {useConfig} from '@tricordarr/Components/Context/Contexts/ConfigContext';
import {DataTable, Text} from 'react-native-paper';
import {SettingDataTableRow} from '@tricordarr/Components/DataTables/SettingDataTableRow';
import {PrimaryActionButton} from '@tricordarr/Components/Buttons/PrimaryActionButton';
import {ListSubheader} from '@tricordarr/Components/Lists/ListSubheader';
import {RootStackComponents, useRootStack} from '@tricordarr/Components/Navigation/Stacks/RootStackNavigator';
import {useAppTheme} from '@tricordarr/Components/../styles/Theme';

export const OobeSettingsScreen = () => {
  const {appConfig, updateAppConfig} = useConfig();
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
