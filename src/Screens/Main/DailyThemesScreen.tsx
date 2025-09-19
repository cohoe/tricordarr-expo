import React from 'react';
import {AppView} from '@tricordarr/Components/Views/AppView';
import {ScrollingContentView} from '@tricordarr/Components/Views/Content/ScrollingContentView';
import {useDailyThemeQuery} from '@tricordarr/Queries/Alert/DailyThemeQueries.ts';
import {LoadingView} from '@tricordarr/Components/Views/Static/LoadingView';
import {RefreshControl} from 'react-native';
import {DailyThemeCard} from '@tricordarr/Components/Cards/MainScreen/DailyThemeCard';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView';
import {useCruise} from '@tricordarr/Components/Context/Contexts/CruiseContext';
import {useAuth} from '@tricordarr/Components/Context/Contexts/AuthContext';
import {NotLoggedInView} from '@tricordarr/Components/Views/Static/NotLoggedInView';
import {ListTitleView} from '@tricordarr/Components/Views/ListTitleView';

export const DailyThemesScreen = () => {
  const {data, refetch, isLoading, isRefetching} = useDailyThemeQuery();
  const {cruiseDayIndex} = useCruise();
  const {isLoggedIn} = useAuth();

  if (!isLoggedIn) {
    return <NotLoggedInView />;
  }

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <AppView>
      <ScrollingContentView
        isStack={true}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}>
        <PaddedContentView padSides={false}>
          <ListTitleView title={`Today is day #${cruiseDayIndex}`} />
        </PaddedContentView>
        {data?.map(dt => {
          return (
            <PaddedContentView key={dt.cruiseDay}>
              <DailyThemeCard dailyTheme={dt} cardTitle={`Theme for day #${dt.cruiseDay}:`} />
            </PaddedContentView>
          );
        })}
      </ScrollingContentView>
    </AppView>
  );
};
