import React from 'react';
import { useConfig } from '@tricordarr/components/Context/Contexts/ConfigContext';
import { SecretHeaderTitle } from '@tricordarr/components/Navigation/Components/SecretHeaderTitle';
import { RootStackComponents, useRootStack } from '@tricordarr/components/Navigation/Stacks/RootStackNavigator';
import { MainStackComponents } from '@tricordarr/components/Navigation/Stacks/MainStackNavigator';
import { BottomTabComponents } from '@tricordarr/components/Navigation/Tabs/BottomTabNavigator';

export const OobeServerHeaderTitle = () => {
  const { appConfig, updateAppConfig } = useConfig();
  const rootNavigation = useRootStack();

  const onReveal = () => {
    updateAppConfig({
      ...appConfig,
      oobeCompletedVersion: appConfig.oobeExpectedVersion,
    });
    rootNavigation.replace(RootStackComponents.rootContentScreen, {
      screen: BottomTabComponents.homeTab,
      params: {
        screen: MainStackComponents.mainScreen,
      },
    });
  };

  return <SecretHeaderTitle title={'Server URL'} onReveal={onReveal} />;
};
