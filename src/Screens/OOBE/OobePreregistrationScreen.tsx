import React from 'react';
import {useConfig} from '@tricordarr/../Context/Contexts/ConfigContext.ts';
import {SiteUIScreenBase} from '@tricordarr/SiteUI/SiteUIScreenBase.tsx';

export const OobePreregistrationScreen = () => {
  const {appConfig} = useConfig();
  return <SiteUIScreenBase initialUrl={appConfig.preRegistrationServerUrl} oobe={true} />;
};
