import { HeaderCard } from '@tricordarr/components/Cards/MainScreen/HeaderCard';
import { PaddedContentView } from '@tricordarr/components/Views/Content/PaddedContentView';
import React from 'react';
import { EasterEggHeaderCard } from '@tricordarr/components/Cards/MainScreen/EasterEggHeaderCard';
import { useConfig } from '@tricordarr/components/Context/Contexts/ConfigContext';

export const TodayHeaderView = () => {
  const { appConfig } = useConfig();
  return (
    <PaddedContentView padTop={true}>
      {appConfig.enableEasterEgg ? <EasterEggHeaderCard /> : <HeaderCard />}
    </PaddedContentView>
  );
};
