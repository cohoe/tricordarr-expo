import React from 'react';
import {useConfig} from '@tricordarr/Components/Context/Contexts/ConfigContext';
import {SiteUIScreenBase} from '@tricordarr/Screens/SiteUI/SiteUIScreenBase';

export const OobePreregistrationScreen = () => {
  const {appConfig} = useConfig();
  return <SiteUIScreenBase initialUrl={appConfig.preRegistrationServerUrl} oobe={true} />;
};
