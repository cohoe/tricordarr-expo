import React from 'react';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SeamailListScreen} from '@tricordarr/Screens/Seamail/SeamailListScreen';
import {useNavigation} from '@react-navigation/native';
import {KrakenTalkCreateScreen} from '@tricordarr/Screens/KrakenTalk/KrakenTalkCreateScreen';
import {UserHeader} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {useStyles} from '@tricordarr/Components/Context/Contexts/StyleContext';
import {useDrawer} from '@tricordarr/Components/Context/Contexts/DrawerContext';
import {SeamailSearchScreen} from '@tricordarr/Screens/Seamail/SeamailSearchScreen';
import {DisabledView} from '@tricordarr/Components/Views/Static/DisabledView';
import {useFeature} from '@tricordarr/Components/Context/Contexts/FeatureContext';
import {SwiftarrFeature} from '@tricordarr/Libraries/Enums/AppFeatures';
import {KrakenTalkReceiveScreen} from '@tricordarr/Screens/KrakenTalk/KrakenTalkReceiveScreen';
import {MainStack} from '@tricordarr/Components/Navigation/Stacks/MainStackNavigator';
import {CommonScreens, CommonStackParamList} from '@tricordarr/Components/Navigation/CommonScreens';
import {SeamailSettingsScreen} from '@tricordarr/Screens/Seamail/SeamailSettingsScreen';

// Beware: https://github.com/react-navigation/react-navigation/issues/10802
export type ChatStackParamList = CommonStackParamList & {
  SeamailListScreen: undefined;
  KrakenTalkCreateScreen?: {
    initialUserHeader?: UserHeader;
  };
  SeamailSearchScreen: {
    forUser?: string;
  };
  KrakenTalkReceiveScreen: {
    callID: string;
    callerUserID: string;
    callerUsername: string;
  };
  SeamailSettingsScreen: undefined;
};

const ChatStack = createNativeStackNavigator<ChatStackParamList>();

export enum ChatStackScreenComponents {
  seamailListScreen = 'SeamailListScreen',
  krakentalkCreateScreen = 'KrakenTalkCreateScreen',
  seamailSearchScreen = 'SeamailSearchScreen',
  krakenTalkReceiveScreen = 'KrakenTalkReceiveScreen',
  seamailSettingsScreen = 'SeamailSettingsScreen',
}

export const ChatStackNavigator = () => {
  const {screenOptions} = useStyles();
  const {getLeftMainHeaderButtons} = useDrawer();
  const {getIsDisabled} = useFeature();
  const isDisabled = getIsDisabled(SwiftarrFeature.seamail);

  return (
    <ChatStack.Navigator initialRouteName={ChatStackScreenComponents.seamailListScreen} screenOptions={screenOptions}>
      <ChatStack.Screen
        name={ChatStackScreenComponents.seamailListScreen}
        component={isDisabled ? DisabledView : SeamailListScreen}
        options={{
          headerLeft: getLeftMainHeaderButtons,
          title: 'Seamail',
        }}
      />
      <ChatStack.Screen
        name={ChatStackScreenComponents.krakentalkCreateScreen}
        component={KrakenTalkCreateScreen}
        options={{title: 'New Call'}}
      />
      <ChatStack.Screen
        name={ChatStackScreenComponents.seamailSearchScreen}
        component={SeamailSearchScreen}
        options={{title: 'Search Seamail'}}
      />
      <ChatStack.Screen
        name={ChatStackScreenComponents.krakenTalkReceiveScreen}
        component={KrakenTalkReceiveScreen}
        options={{title: 'Incoming Call'}}
      />
      <ChatStack.Screen
        name={ChatStackScreenComponents.seamailSettingsScreen}
        component={SeamailSettingsScreen}
        options={{title: 'Seamail Settings'}}
      />
      {CommonScreens(ChatStack as typeof MainStack)}
    </ChatStack.Navigator>
  );
};

export const useChatStack = () => useNavigation<NativeStackNavigationProp<ChatStackParamList>>();
