import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useStyles } from '@tricordarr/components/Context/Contexts/StyleContext';
import { OobeWelcomeScreen } from '@tricordarr/components/Screens/OOBE/OobeWelcomeScreen';
import { OobeServerScreen } from '@tricordarr/components/Screens/OOBE/OobeServerScreen';
import { OobeConductScreen } from '@tricordarr/components/Screens/OOBE/OobeConductScreen';
import { OobeFinishScreen } from '@tricordarr/components/Screens/OOBE/OobeFinishScreen';
import { OobeAccountScreen } from '@tricordarr/components/Screens/OOBE/OobeAccountScreen';
import { LoginScreen } from '@tricordarr/components/Screens/Settings/Account/LoginScreen';
import { OobeRegisterScreen } from '@tricordarr/components/Screens/Settings/Account/RegisterScreen';
import { OobePermissionsScreen } from '@tricordarr/components/Screens/OOBE/OobePermissionsScreen';
import { CommonScreens, CommonStackParamList } from '@tricordarr/components/Navigation/CommonScreens';
import { MainStack } from '@tricordarr/components/Navigation/Stacks/MainStackNavigator';
import { OobePreregistrationScreen } from '@tricordarr/components/Screens/OOBE/OobePreregistrationScreen';
import { OobeUserDataScreen } from '@tricordarr/components/Screens/OOBE/OobeUserDataScreen';
import { ScheduleDayScreen } from '@tricordarr/components/Screens/Schedule/ScheduleDayScreen';

export type OobeStackParamList = CommonStackParamList & {
  OobeWelcomeScreen: undefined;
  OobeServerScreen: undefined;
  OobeConductScreen: undefined;
  OobeAccountScreen: undefined;
  LoginScreen: undefined;
  OobeFinishScreen: undefined;
  RegisterScreen: undefined;
  OobePermissionsScreen: undefined;
  OobePreregistrationScreen: undefined;
  OobeUserDataScreen: undefined;
  OobeScheduleDayScreen: {
    oobe?: boolean;
  };
};

export enum OobeStackComponents {
  oobeWelcomeScreen = 'OobeWelcomeScreen',
  oobeServerScreen = 'OobeServerScreen',
  oobeConductScreen = 'OobeConductScreen',
  oobeAccountScreen = 'OobeAccountScreen',
  oobeRegisterScreen = 'RegisterScreen',
  oobeFinishScreen = 'OobeFinishScreen',
  oobeLoginScreen = 'LoginScreen',
  oobePermissionsScreen = 'OobePermissionsScreen',
  oobePreregistrationScreen = 'OobePreregistrationScreen',
  oobeUserDataScreen = 'OobeUserDataScreen',
  oobeScheduleDayScreen = 'OobeScheduleDayScreen',
}

export const OobeStackNavigator = () => {
  const { screenOptions } = useStyles();
  const Stack = createNativeStackNavigator<OobeStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName={OobeStackComponents.oobeWelcomeScreen}
      screenOptions={{ ...screenOptions, headerShown: true }}>
      <Stack.Screen
        name={OobeStackComponents.oobeWelcomeScreen}
        component={OobeWelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={OobeStackComponents.oobeServerScreen}
        component={OobeServerScreen}
        options={{ title: 'Server URL' }}
      />
      <Stack.Screen
        name={OobeStackComponents.oobeConductScreen}
        component={OobeConductScreen}
        options={{ title: 'Code of Conduct' }}
      />
      <Stack.Screen
        name={OobeStackComponents.oobeAccountScreen}
        component={OobeAccountScreen}
        options={{ title: 'Account' }}
      />
      <Stack.Screen name={OobeStackComponents.oobeLoginScreen} component={LoginScreen} options={{ title: 'Login' }} />
      <Stack.Screen
        name={OobeStackComponents.oobeRegisterScreen}
        component={OobeRegisterScreen}
        options={{ title: 'Register' }}
      />
      <Stack.Screen
        name={OobeStackComponents.oobePermissionsScreen}
        component={OobePermissionsScreen}
        options={{ title: 'Permissions' }}
      />
      <Stack.Screen
        name={OobeStackComponents.oobeFinishScreen}
        component={OobeFinishScreen}
        options={{ title: 'Finish' }}
      />
      <Stack.Screen
        name={OobeStackComponents.oobePreregistrationScreen}
        component={OobePreregistrationScreen}
        options={{ title: 'Pre-Registration' }}
      />
      <Stack.Screen
        name={OobeStackComponents.oobeUserDataScreen}
        component={OobeUserDataScreen}
        options={{ title: 'User Data' }}
      />
      <Stack.Screen
        name={OobeStackComponents.oobeScheduleDayScreen}
        component={ScheduleDayScreen}
        options={{ title: 'Schedule' }}
      />
      {CommonScreens(Stack as typeof MainStack)}
    </Stack.Navigator>
  );
};

export const useOobeStack = () => useNavigation<NativeStackNavigationProp<OobeStackParamList>>();
