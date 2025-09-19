import {HeaderCard} from '@tricordarr/Components/Cards/MainScreen/HeaderCard.tsx';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView.tsx';
import React from 'react';
import {EasterEggHeaderCard} from '@tricordarr/Components/Cards/MainScreen/EasterEggHeaderCard.tsx';
import {useConfig} from '@tricordarr/Components/Context/Contexts/ConfigContext.ts';

export const TodayHeaderView = () => {
  const {appConfig} = useConfig();
  return (
    <PaddedContentView padTop={true}>
      {appConfig.enableEasterEgg ? <EasterEggHeaderCard /> : <HeaderCard />}
    </PaddedContentView>
  );
};
