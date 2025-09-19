import {HeaderCard} from '@tricordarr/Components/Cards/MainScreen/HeaderCard';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView';
import React from 'react';
import {EasterEggHeaderCard} from '@tricordarr/Components/Cards/MainScreen/EasterEggHeaderCard';
import {useConfig} from '@tricordarr/Components/Context/Contexts/ConfigContext';

export const TodayHeaderView = () => {
  const {appConfig} = useConfig();
  return (
    <PaddedContentView padTop={true}>
      {appConfig.enableEasterEgg ? <EasterEggHeaderCard /> : <HeaderCard />}
    </PaddedContentView>
  );
};
