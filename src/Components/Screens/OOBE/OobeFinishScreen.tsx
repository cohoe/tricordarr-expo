import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OobeStackComponents, OobeStackParamList } from '@tricordarr/components/Navigation/Stacks/OobeStackNavigator';
import { AppView } from '@tricordarr/components/Views/AppView';
import { ScrollingContentView } from '@tricordarr/components/Views/Content/ScrollingContentView';
import { useConfig } from '@tricordarr/components/Context/Contexts/ConfigContext';
import { RootStackComponents, useRootStack } from '@tricordarr/components/Navigation/Stacks/RootStackNavigator';
import { OobeButtonsView } from '@tricordarr/components/Views/OobeButtonsView';
import { PaddedContentView } from '@tricordarr/components/Views/Content/PaddedContentView';
import { startForegroundServiceWorker } from '@tricordarr/libraries/Service';
import { OobeNoteCard } from '@tricordarr/components/Cards/OobeNoteCard';
import { MainStackComponents } from '@tricordarr/components/Navigation/Stacks/MainStackNavigator';
import { BottomTabComponents } from '@tricordarr/components/Navigation/Tabs/BottomTabNavigator';
import { OobePreRegistrationCompleteCard } from '@tricordarr/components/Cards/OobePreRegistrationCompleteCard';

type Props = NativeStackScreenProps<OobeStackParamList, OobeStackComponents.oobeFinishScreen>;

export const OobeFinishScreen = ({ navigation }: Props) => {
  const { appConfig, updateAppConfig, preRegistrationMode } = useConfig();
  const rootNavigation = useRootStack();

  const onFinish = async () => {
    updateAppConfig({
      ...appConfig,
      oobeCompletedVersion: appConfig.oobeExpectedVersion,
    });
    startForegroundServiceWorker();
    rootNavigation.replace(RootStackComponents.rootContentScreen, {
      screen: BottomTabComponents.homeTab,
      params: {
        screen: MainStackComponents.mainScreen,
      },
    });
  };

  return (
    <AppView safeEdges={['bottom']}>
      <ScrollingContentView isStack={true}>
        <PaddedContentView padTop={true}>
          {preRegistrationMode ? <OobePreRegistrationCompleteCard /> : <OobeNoteCard />}
        </PaddedContentView>
      </ScrollingContentView>
      <OobeButtonsView
        leftOnPress={() => navigation.goBack()}
        rightText={'Finish'}
        rightOnPress={onFinish}
        rightDisabled={preRegistrationMode}
      />
    </AppView>
  );
};
