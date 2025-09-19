import React from 'react';
import {useConfig} from '@tricordarr/Components/Context/Contexts/ConfigContext';
import {SecretHeaderTitle} from '@tricordarr/Components/Navigation/Components/SecretHeaderTitle';
import {useSnackbar} from '@tricordarr/Components/Context/Contexts/SnackbarContext';

/**
 * Header title for the SettingsScreen. This has a secret feature to enable/disable the menu of developer
 * options in the Settings. Those are useful for rectal use only.
 */
export const SettingsHeaderTitle = () => {
  const {appConfig, updateAppConfig} = useConfig();
  const {setSnackbarPayload} = useSnackbar();

  const onReveal = () => {
    updateAppConfig({
      ...appConfig,
      enableDeveloperOptions: !appConfig.enableDeveloperOptions,
    });
    setSnackbarPayload({
      message: `Developer options are now ${!appConfig.enableDeveloperOptions ? 'enabled' : 'disabled'}`,
      messageType: 'info',
    });
  };

  return <SecretHeaderTitle title={'Settings'} onReveal={onReveal} />;
};
