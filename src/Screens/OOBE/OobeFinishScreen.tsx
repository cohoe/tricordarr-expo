import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OobeStackComponents, OobeStackParamList} from '@tricordarr/Components/Navigation/Stacks/OobeStackNavigator';
import {AppView} from '@tricordarr/Components/Views/AppView';
import {ScrollingContentView} from '@tricordarr/Components/Views/Content/ScrollingContentView';
import {useConfig} from '@tricordarr/Components/Context/Contexts/ConfigContext';
import {RootStackComponents, useRootStack} from '@tricordarr/Components/Navigation/Stacks/RootStackNavigator';
import {OobeButtonsView} from '@tricordarr/Components/Views/OobeButtonsView';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView';
import {startForegroundServiceWorker} from '@tricordarr/Libraries/Service';
import {OobeNoteCard} from '@tricordarr/Components/Cards/OobeNoteCard';
import {MainStackComponents} from '@tricordarr/Components/Navigation/Stacks/MainStackNavigator.tsx';
import {BottomTabComponents} from '@tricordarr/Components/Navigation/Tabs/BottomTabNavigator.tsx';
import {OobePreRegistrationCompleteCard} from '@tricordarr/Components/Cards/OobePreRegistrationCompleteCard.tsx';

type Props = NativeStackScreenProps<OobeStackParamList, OobeStackComponents.oobeFinishScreen>;

export const OobeFinishScreen = ({navigation}: Props) => {
  const {appConfig, updateAppConfig, preRegistrationMode} = useConfig();
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
