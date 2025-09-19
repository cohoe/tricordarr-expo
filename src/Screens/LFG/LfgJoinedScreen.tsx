import React, {useEffect} from 'react';
import {LfgListScreen} from '@tricordarr/LfgListScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LfgStackComponents, LfgStackParamList} from '@tricordarr/../Navigation/Stacks/LFGStackNavigator';
import {useDrawer} from '@tricordarr/../Context/Contexts/DrawerContext';
import {useConfig} from '@tricordarr/../Context/Contexts/ConfigContext';

type Props = NativeStackScreenProps<LfgStackParamList, LfgStackComponents.lfgJoinedScreen>;

export const LfgJoinedScreen = ({navigation}: Props) => {
  const {getLeftMainHeaderButtons} = useDrawer();
  const {appConfig} = useConfig();

  useEffect(() => {
    if (appConfig.schedule.defaultLfgScreen === LfgStackComponents.lfgJoinedScreen) {
      navigation.setOptions({
        headerLeft: getLeftMainHeaderButtons,
      });
    }
  }, [appConfig.schedule.defaultLfgScreen, getLeftMainHeaderButtons, navigation]);

  return <LfgListScreen endpoint={'joined'} />;
};
