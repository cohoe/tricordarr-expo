import React from 'react';
import { AppView } from '@tricordarr/components/Views/AppView';
import { ScrollingContentView } from '@tricordarr/components/Views/Content/ScrollingContentView';
import { useDailyThemeQuery } from '@tricordarr/components/Queries/Alert/DailyThemeQueries';
import { LoadingView } from '@tricordarr/components/Views/Static/LoadingView';
import { RefreshControl } from 'react-native';
import { DailyThemeCard } from '@tricordarr/components/Cards/MainScreen/DailyThemeCard';
import { PaddedContentView } from '@tricordarr/components/Views/Content/PaddedContentView';
import { useCruise } from '@tricordarr/components/Context/Contexts/CruiseContext';
import { useAuth } from '@tricordarr/components/Context/Contexts/AuthContext';
import { NotLoggedInView } from '@tricordarr/components/Views/Static/NotLoggedInView';
import { ListTitleView } from '@tricordarr/components/Views/ListTitleView';

export const DailyThemesScreen = () => {
  const { data, refetch, isLoading, isRefetching } = useDailyThemeQuery();
  const { cruiseDayIndex } = useCruise();
  const { isLoggedIn } = useAuth();

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
