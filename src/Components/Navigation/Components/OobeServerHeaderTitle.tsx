import React from 'react';
import {useConfig} from '@tricordarr/Components/Context/Contexts/ConfigContext';
import {SecretHeaderTitle} from '@tricordarr/Components/Navigation/Components/SecretHeaderTitle';
import {RootStackComponents, useRootStack} from '@tricordarr/Components/Navigation/Stacks/RootStackNavigator';
import {MainStackComponents} from '@tricordarr/Components/Navigation/Stacks/MainStackNavigator';
import {BottomTabComponents} from '@tricordarr/Components/Navigation/Tabs/BottomTabNavigator';

export const OobeServerHeaderTitle = () => {
  const {appConfig, updateAppConfig} = useConfig();
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
