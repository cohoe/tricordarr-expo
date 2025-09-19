import React, {useEffect, useState} from 'react';
import {useDailyThemeQuery} from '@tricordarr/Queries/Alert/DailyThemeQueries';
import {useCruise} from '@tricordarr/Components/Context/Contexts/CruiseContext';
import {DailyThemeData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView';
import {DailyThemeCard} from '@tricordarr/Components/Cards/MainScreen/DailyThemeCard';

export const TodayThemeView = () => {
  const {data: dailyThemeData} = useDailyThemeQuery();
  const {cruiseLength, adjustedCruiseDayIndex} = useCruise();
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
