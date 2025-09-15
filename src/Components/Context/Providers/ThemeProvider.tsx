import React, {PropsWithChildren, useCallback} from 'react';
import {twitarrTheme, twitarrThemeDark} from '@tricordarr/Styles/Theme';
import {PaperProvider} from 'react-native-paper';
import {useColorScheme} from 'react-native';
import {useConfig} from '@tricordarr/Components/Context/Contexts/ConfigContext';

export const ThemeProvider = ({children}: PropsWithChildren) => {
  const colorScheme = useColorScheme();
  const {appConfig} = useConfig();

  const isDarkMode = useCallback(() => {
    if (appConfig.accessibility.useSystemTheme) {
      return colorScheme === 'dark';
    }
    return appConfig.accessibility.darkMode;
  }, [appConfig.accessibility.darkMode, appConfig.accessibility.useSystemTheme, colorScheme]);
  
  return (
    <PaperProvider theme={isDarkMode() ? twitarrThemeDark : twitarrTheme}>{children}</PaperProvider>
  );
};