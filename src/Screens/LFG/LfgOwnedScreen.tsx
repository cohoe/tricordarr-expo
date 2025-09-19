import React, {useEffect} from 'react';
import {LfgListScreen} from '@tricordarr/Screens/LFG/LfgListScreen';
import {useDrawer} from '@tricordarr/Components/Context/Contexts/DrawerContext';
import {useConfig} from '@tricordarr/Components/Context/Contexts/ConfigContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LfgStackComponents, LfgStackParamList} from '@tricordarr/Components/Navigation/Stacks/LFGStackNavigator';

type Props = NativeStackScreenProps<LfgStackParamList, LfgStackComponents.lfgOwnedScreen>;

export const LfgOwnedScreen = ({navigation}: Props) => {
  const {getLeftMainHeaderButtons} = useDrawer();
  const {appConfig} = useConfig();

  useEffect(() => {
    if (appConfig.schedule.defaultLfgScreen === LfgStackComponents.lfgOwnedScreen) {
      navigation.setOptions({
        headerLeft: getLeftMainHeaderButtons,
      });
    }
  }, [appConfig.schedule.defaultLfgScreen, getLeftMainHeaderButtons, navigation]);

  return <LfgListScreen endpoint={'owner'} />;
};
