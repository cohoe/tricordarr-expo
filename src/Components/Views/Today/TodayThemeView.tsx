import React, { useEffect, useState } from 'react';
import { useDailyThemeQuery } from '@tricordarr/components/Queries/Alert/DailyThemeQueries';
import { useCruise } from '@tricordarr/components/Context/Contexts/CruiseContext';
import { DailyThemeData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { PaddedContentView } from '@tricordarr/components/Views/Content/PaddedContentView';
import { DailyThemeCard } from '@tricordarr/components/Cards/MainScreen/DailyThemeCard';

export const TodayThemeView = () => {
  const { data: dailyThemeData } = useDailyThemeQuery();
  const { cruiseLength, adjustedCruiseDayIndex } = useCruise();
  const [dailyTheme, setDailyTheme] = useState<DailyThemeData>();

  useEffect(() => {
    setDailyTheme(DailyThemeData.getThemeForDay(adjustedCruiseDayIndex, cruiseLength, dailyThemeData));
  }, [adjustedCruiseDayIndex, cruiseLength, dailyThemeData]);

  if (!dailyTheme) {
    return <></>;
  }
  return (
    <PaddedContentView>
      <DailyThemeCard dailyTheme={dailyTheme} />
    </PaddedContentView>
  );
};
