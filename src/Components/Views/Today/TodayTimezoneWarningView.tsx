import React from 'react';
import {TimezoneWarningCard} from '@tricordarr/Components/Cards/MainScreen/TimezoneWarningCard.tsx';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView.tsx';
import {useCruise} from '@tricordarr/Components/Context/Contexts/CruiseContext.ts';

export const TodayTimezoneWarningView = () => {
  const {showTimeZoneWarning} = useCruise();
  if (!showTimeZoneWarning) {
    return <></>;
  }

  return (
    <PaddedContentView>
      <TimezoneWarningCard />
    </PaddedContentView>
  );
};
