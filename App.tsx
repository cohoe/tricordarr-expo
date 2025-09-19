/**
 * Tricordarr Secondary Entrypoint.
 * index.js is still the start. The good stuff goes here.
 */

import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {Portal} from 'react-native-paper';
import {setupChannels} from '@tricordarr/Libraries/Notifications/Channels';
import {UserNotificationDataProvider} from '@tricordarr/Components/Context/Providers/UserNotificationDataProvider';
import {setupInitialNotification} from '@tricordarr/Libraries/Notifications/InitialNotification';
import {ErrorHandlerProvider} from '@tricordarr/Components/Context/Providers/ErrorHandlerProvider';
import {ForegroundService} from '@tricordarr/Components/Libraries/Notifications/ForegroundService';
import {NotificationDataListener} from '@tricordarr/Components/Libraries/Notifications/NotificationDataListener';
import {StyleProvider} from '@tricordarr/Components/Context/Providers/StyleProvider';
import {ModalProvider} from '@tricordarr/Components/Context/Providers/ModalProvider';
import {TwitarrProvider} from '@tricordarr/Components/Context/Providers/TwitarrProvider';
import {PrivilegeProvider} from '@tricordarr/Components/Context/Providers/PrivilegeProvider';
import {SocketProvider} from '@tricordarr/Components/Context/Providers/SocketProvider';
import {AppEventHandler} from '@tricordarr/Components/Navigation/AppEventHandler';
import {AuthProvider} from '@tricordarr/Components/Context/Providers/AuthProvider';
import {ConfigProvider} from '@tricordarr/Components/Context/Providers/ConfigProvider';
import {registerFgsWorker} from '@tricordarr/Libraries/Service';  
import {RootStackNavigator} from '@tricordarr/Components/Navigation/Stacks/RootStackNavigator';
import {DrawerProvider} from '@tricordarr/Components/Context/Providers/DrawerProvider';
import {HeaderButtonsProvider} from 'react-navigation-header-buttons/HeaderButtonsProvider';
import {CruiseProvider} from '@tricordarr/Components/Context/Providers/CruiseProvider';
import {FilterProvider} from '@tricordarr/Components/Context/Providers/FilterProvider';
import {registerTranslation, en as paperEn} from 'react-native-paper-dates';
import {FeatureProvider} from '@tricordarr/Components/Context/Providers/FeatureProvider';
import {NotificationDataPoller} from '@tricordarr/Components/Libraries/Notifications/NotificationDataPoller';
// https://reactnavigation.org/docs/drawer-layout/
import 'react-native-gesture-handler';

// https://github.com/facebook/react-native/issues/30034
// https://phab.comm.dev/D6193
// react-native has an issue with inverted lists on Android, and it got worse
// with Android 13. To avoid it we patch a react-native style, but that style
// got deprecated in React Native 0.70. For now the deprecation is limited to a
// JS runtime check, which we disable here.
// @ts-ignore
import ViewReactNativeStyleAttributes from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import {SwiftarrQueryClientProvider} from '@tricordarr/Components/Context/Providers/SwiftarrQueryClientProvider';
import {LoadingProvider} from '@tricordarr/Components/Context/Providers/LoadingProvider';
import {AppNavigationThemeProvider} from '@tricordarr/Components/Context/Providers/AppNavigationThemeProvider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {CriticalErrorProvider} from '@tricordarr/Components/Context/Providers/CriticalErrorProvider';
import {SelectionProvider} from '@tricordarr/Components/Context/Providers/SelectionProvider';
import {configureImageCache} from '@tricordarr/Libraries/Storage/ImageStorage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SnackbarProvider} from '@tricordarr/Components/Context/Providers/SnackbarProvider';
ViewReactNativeStyleAttributes.scaleY = true;

// For development, disable warning popups because I already respond to them.
if (__DEV__) {
  LogBox.ignoreLogs(['AxiosError', 'Websockets.ts']);
}

console.log('[App.tsx] Tricordarr start!');
// Declare what the Foreground Service worker function should be.
// After the configureAxios() was deprecated and removed, this was acting kinda
// weird. Moved it further up in this file.
registerFgsWorker();

// Time and locale setup, used in various places within the app.
registerTranslation('en', paperEn);

// Set up image caching
configureImageCache();

function App(): React.JSX.Element {
  setupChannels().catch(error => {
    console.error('Error setting up notification channels:', error);
  });

  useEffect(() => {
    console.log('[App.tsx] Calling useEffect from Main App.');
    setupInitialNotification().catch(console.error);
  }, []);

  /**
   * Known Dependencies:
   * These were of course not determined when I did the big refactor around LFGs/Forums
   * when it would have been useful...
   *
   * SwiftarrQueryClientProvider needs ConfigProvider for cache busting.
   * StyleProvider needs PaperProvider for theming.
   * LoadingProvider needs SwiftarrQueryClientProvider for useIsRestoring.
   * SwiftarrQueryClientProvider requires ErrorHandlerProvider for global error callback.
   * LoadingProvider requires SafeAreaProvider since it's the first usage of AppView.
   * SnackbarProvider shouldn't need anything.
   * TwitarrProvider needs ConfigProvider and SwiftarrQueryClientProvider.
   * AppNavigationThemeProvider should be within SafeAreaProvider.
   */
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <ConfigProvider>
          <AppNavigationThemeProvider>
            <StyleProvider>
              <ErrorHandlerProvider>
                <SnackbarProvider>
                  <AuthProvider>
                    <SwiftarrQueryClientProvider>
                      <LoadingProvider>
                        <CriticalErrorProvider>
                          <PrivilegeProvider>
                            <SocketProvider>
                              <TwitarrProvider>
                                <UserNotificationDataProvider>
                                  <FeatureProvider>
                                    <ModalProvider>
                                      <Portal.Host>
                                        <HeaderButtonsProvider stackType={'native'}>
                                          <CruiseProvider>
                                            <DrawerProvider>
                                              <FilterProvider>
                                                <SelectionProvider>
                                                  <AppEventHandler />
                                                  <ForegroundService />
                                                  <NotificationDataListener />
                                                  <NotificationDataPoller />
                                                  <RootStackNavigator />
                                                </SelectionProvider>
                                              </FilterProvider>
                                            </DrawerProvider>
                                          </CruiseProvider>
                                        </HeaderButtonsProvider>
                                      </Portal.Host>
                                    </ModalProvider>
                                  </FeatureProvider>
                                </UserNotificationDataProvider>
                              </TwitarrProvider>
                            </SocketProvider>
                          </PrivilegeProvider>
                        </CriticalErrorProvider>
                      </LoadingProvider>
                    </SwiftarrQueryClientProvider>
                  </AuthProvider>
                </SnackbarProvider>
              </ErrorHandlerProvider>
            </StyleProvider>
          </AppNavigationThemeProvider>
        </ConfigProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;