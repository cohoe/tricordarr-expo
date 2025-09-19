import React from 'react';
import {TimezoneWarningCard} from '@tricordarr/Components/Cards/MainScreen/TimezoneWarningCard';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView';
import {useCruise} from '@tricordarr/Components/Context/Contexts/CruiseContext';

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
