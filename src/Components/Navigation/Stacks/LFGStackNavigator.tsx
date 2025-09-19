import React from 'react';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useStyles} from '@tricordarr/Components/Context/Contexts/StyleContext';
import {LfgJoinedScreen} from '@tricordarr/Screens/LFG/LfgJoinedScreen';
import {LfgFindScreen} from '@tricordarr/Screens/LFG/LfgFindScreen';
import {LfgSettingsScreen} from '@tricordarr/Screens/LFG/LfgSettingsScreen';
import {LfgCreateScreen} from '@tricordarr/Screens/LFG/LfgCreateScreen';
import {SwiftarrFeature} from '@tricordarr/Libraries/Enums/AppFeatures';
import {useFeature} from '@tricordarr/Components/Context/Contexts/FeatureContext';
import {DisabledView} from '@tricordarr/Components/Views/Static/DisabledView';
import {useConfig} from '@tricordarr/Components/Context/Contexts/ConfigContext';
import {CommonScreens, CommonStackParamList} from '@tricordarr/Components/Navigation/CommonScreens';
import {MainStack} from '@tricordarr/Components/Navigation/Stacks/MainStackNavigator';
import {LfgOwnedScreen} from '@tricordarr/Screens/LFG/LfgOwnedScreen';
import {LfgFormerScreen} from '@tricordarr/Screens/LFG/LfgFormerScreen';
import {LfgSearchScreen} from '@tricordarr/Screens/LFG/LfgSearchScreen';
import {FezListEndpoints} from '@tricordarr/Libraries/Types';

export type LfgStackParamList = CommonStackParamList & {
  LfgJoinedScreen: undefined;
  LfgFindScreen: undefined;
  LfgOwnedScreen: undefined;
  LfgSettingsScreen: undefined;
  LfgCreateScreen: undefined;
  LfgFormerScreen: undefined;
  LfgSearchScreen: {
    endpoint: FezListEndpoints;
  };
};

export enum LfgStackComponents {
  lfgOwnedScreen = 'LfgOwnedScreen',
  lfgJoinedScreen = 'LfgJoinedScreen',
  lfgFindScreen = 'LfgFindScreen',
  lfgSettingsScreen = 'LfgSettingsScreen',
  lfgCreateScreen = 'LfgCreateScreen',
  lfgFormerScreen = 'LfgFormerScreen',
  lfgSearchScreen = 'LfgSearchScreen',
}

export const LfgStackNavigator = () => {
  const {screenOptions} = useStyles();
  const Stack = createNativeStackNavigator<LfgStackParamList>();
  const {getIsDisabled} = useFeature();
  const isDisabled = getIsDisabled(SwiftarrFeature.friendlyfez);
  const {appConfig} = useConfig();

  return (
    <Stack.Navigator
      initialRouteName={appConfig.schedule.defaultLfgScreen}
      screenOptions={{...screenOptions, headerShown: true}}>
      <Stack.Screen
        name={LfgStackComponents.lfgJoinedScreen}
        component={LfgJoinedScreen}
        options={{title: 'Joined Groups'}}
      />
      <Stack.Screen
        name={LfgStackComponents.lfgFindScreen}
        component={isDisabled ? DisabledView : LfgFindScreen}
        options={{title: 'Find Groups'}}
      />
      <Stack.Screen
        name={LfgStackComponents.lfgOwnedScreen}
        component={isDisabled ? DisabledView : LfgOwnedScreen}
        options={{title: 'Your Groups'}}
      />
      <Stack.Screen
        name={LfgStackComponents.lfgSettingsScreen}
        component={LfgSettingsScreen}
        options={{title: 'LFG Settings'}}
      />
      <Stack.Screen
        name={LfgStackComponents.lfgCreateScreen}
        component={LfgCreateScreen}
        options={{title: 'New LFG'}}
      />
      <Stack.Screen
        name={LfgStackComponents.lfgFormerScreen}
        component={isDisabled ? DisabledView : LfgFormerScreen}
        options={{title: 'Former Groups'}}
      />
      <Stack.Screen
        name={LfgStackComponents.lfgSearchScreen}
        component={isDisabled ? DisabledView : LfgSearchScreen}
        options={{title: 'Search LFGs'}}
      />
      {CommonScreens(Stack as typeof MainStack)}
    </Stack.Navigator>
  );
};

export const useLFGStackNavigation = () => useNavigation<NativeStackNavigationProp<LfgStackParamList>>();

export const useLFGStackRoute = () => useRoute<RouteProp<LfgStackParamList>>();
