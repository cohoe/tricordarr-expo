import React from 'react';
import { TimezoneWarningCard } from '@tricordarr/components/Cards/MainScreen/TimezoneWarningCard';
import { PaddedContentView } from '@tricordarr/components/Views/Content/PaddedContentView';
import { useCruise } from '@tricordarr/components/Context/Contexts/CruiseContext';

export const TodayTimezoneWarningView = () => {
  const { showTimeZoneWarning } = useCruise();
  if (!showTimeZoneWarning) {
    return <></>;
  }

  return (
    <PaddedContentView>
      <TimezoneWarningCard />
    </PaddedContentView>
  );
};
