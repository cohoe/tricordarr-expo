import React from 'react';
import { useConfig } from '@tricordarr/components/Context/Contexts/ConfigContext';
import { SiteUIScreenBase } from '@tricordarr/components/Screens/SiteUI/SiteUIScreenBase';

export const OobePreregistrationScreen = () => {
  const { appConfig } = useConfig();
  return <SiteUIScreenBase initialUrl={appConfig.preRegistrationServerUrl} oobe={true} />;
};
