import { AppView } from '@tricordarr/components/Views/AppView';
import { FezType } from '@tricordarr/libraries/Enums/FezType';
import { LoadingView } from '@tricordarr/components/Views/Static/LoadingView';
import React, { useCallback, useEffect, useRef } from 'react';
import { FezData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { FlashList } from '@shopify/flash-list';
import { RefreshControl, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MaterialHeaderButton } from '@tricordarr/components/Buttons/MaterialHeaderButton';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { CommonStackComponents, useCommonStack } from '@tricordarr/components/Navigation/CommonScreens';
import { LfgCruiseDayFilterMenu } from '@tricordarr/components/Menus/LFG/LfgCruiseDayFilterMenu';
import { useFilter } from '@tricordarr/components/Context/Contexts/FilterContext';
import { LfgFilterMenu } from '@tricordarr/components/Menus/LFG/LfgFilterMenu';
import { LFGFlatList } from '@tricordarr/components/Lists/Schedule/LFGFlatList';
import { usePersonalEventsQuery } from '@tricordarr/components/Queries/Fez/FezQueries';
import { SchedulePersonalEventCreateFAB } from '@tricordarr/components/Buttons/FloatingActionButtons/SchedulePersonalEventCreateFAB';

export const SchedulePrivateEventsScreen = () => {
  const { lfgCruiseDayFilter, lfgHidePastFilter } = useFilter();
  const { data, isFetching, refetch, hasNextPage, fetchNextPage } = usePersonalEventsQuery({
    fezType: [FezType.privateEvent, FezType.personalEvent],
    // @TODO we intend to change this some day. Upstream Swiftarr issue.
    cruiseDay: lfgCruiseDayFilter ? lfgCruiseDayFilter - 1 : undefined,
    hidePast: lfgHidePastFilter,
  });
  const listRef = useRef<FlashList<FezData>>(null);
  const navigation = useCommonStack();

  const getNavButtons = useCallback(() => {
    return (
      <View>
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <LfgCruiseDayFilterMenu />
          <LfgFilterMenu showTypes={false} />
          <Item
            title={'Help'}
            iconName={AppIcons.help}
            onPress={() => navigation.push(CommonStackComponents.scheduleHelpScreen)}
          />
        </HeaderButtons>
      </View>
    );
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: getNavButtons,
    });
  }, [getNavButtons, navigation]);

  if (!data) {
    return <LoadingView />;
  }

  return (
    <AppView>
      <LFGFlatList
        items={data.pages.flatMap(p => p.fezzes)}
        listRef={listRef}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        separator={'day'}
        hasNextPage={hasNextPage}
        handleLoadNext={fetchNextPage}
      />
      <SchedulePersonalEventCreateFAB />
    </AppView>
  );
};
