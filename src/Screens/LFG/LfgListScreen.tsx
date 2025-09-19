import React, {ReactElement, useCallback, useEffect, useRef, useState} from 'react';
import {AppView} from '@tricordarr/../Views/AppView';
import {useLfgListQuery} from '@tricordarr/../Queries/Fez/FezQueries';
import {RefreshControl, View} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {MaterialHeaderButton} from '@tricordarr/../Buttons/MaterialHeaderButton';
import {LfgFilterMenu} from '@tricordarr/../Menus/LFG/LfgFilterMenu.tsx';
import {useFilter} from '@tricordarr/../Context/Contexts/FilterContext';
import {LfgCruiseDayFilterMenu} from '@tricordarr/../Menus/LFG/LfgCruiseDayFilterMenu.tsx';
import {LfgListActionsMenu} from '@tricordarr/../Menus/LFG/LfgListActionsMenu.tsx';
import {LfgFAB} from '@tricordarr/../Buttons/FloatingActionButtons/LfgFAB';
import {useIsFocused} from '@react-navigation/native';
import {useSocket} from '@tricordarr/../Context/Contexts/SocketContext';
import {LfgStackComponents, useLFGStackNavigation} from '@tricordarr/../Navigation/Stacks/LFGStackNavigator';
import {NotLoggedInView} from '@tricordarr/../Views/Static/NotLoggedInView';
import {useAuth} from '@tricordarr/../Context/Contexts/AuthContext';
import {LoadingView} from '@tricordarr/../Views/Static/LoadingView';
import {NotificationTypeData, SocketNotificationData} from '@tricordarr/../../Libraries/Structs/SocketStructs';
import {LFGFlatList} from '@tricordarr/../Lists/Schedule/LFGFlatList.tsx';
import {TimezoneWarningView} from '@tricordarr/../Views/Warnings/TimezoneWarningView.tsx';
import {FezData} from '@tricordarr/../../Libraries/Structs/ControllerStructs.tsx';
import {FlashList} from '@shopify/flash-list';
import {FezListEndpoints} from '@tricordarr/../../Libraries/Types';
import {useQueryClient} from '@tanstack/react-query';
import {AppIcons} from '@tricordarr/../../Libraries/Enums/Icons.ts';

interface LfgJoinedScreenProps {
  endpoint: FezListEndpoints;
  enableFilters?: boolean;
  enableReportOnly?: boolean;
  listHeader?: ReactElement;
  showFab?: boolean;
}

export const LfgListScreen = ({
  endpoint,
  enableFilters = true,
  enableReportOnly,
  listHeader,
  showFab = true,
}: LfgJoinedScreenProps) => {
  const {lfgTypeFilter, lfgHidePastFilter, lfgCruiseDayFilter} = useFilter();
  const {isLoggedIn} = useAuth();
  const {data, isFetching, refetch, isLoading, fetchNextPage, isFetchingPreviousPage, isFetchingNextPage, hasNextPage} =
    useLfgListQuery({
      endpoint: endpoint,
      fezType: lfgTypeFilter,
      // @TODO we intend to change this some day. Upstream Swiftarr issue.
      cruiseDay: lfgCruiseDayFilter ? lfgCruiseDayFilter - 1 : undefined,
      hidePast: lfgHidePastFilter,
    });
  const navigation = useLFGStackNavigation();
  const isFocused = useIsFocused();
  const {notificationSocket} = useSocket();
  const [showFabLabel, setShowFabLabel] = useState(true);
  const onScrollThreshold = (hasScrolled: boolean) => setShowFabLabel(!hasScrolled);
  const listRef = useRef<FlashList<FezData>>(null);
  const queryClient = useQueryClient();
  const [fezList, setFezList] = useState<FezData[]>([]);

  const getNavButtons = useCallback(() => {
    if (!isLoggedIn) {
      return <></>;
    }
    return (
      <View>
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          {enableFilters && (
            <>
              <Item
                title={'Search'}
                iconName={AppIcons.search}
                onPress={() =>
                  navigation.push(LfgStackComponents.lfgSearchScreen, {
                    endpoint: endpoint,
                  })
                }
              />
              <LfgCruiseDayFilterMenu />
              <LfgFilterMenu />
            </>
          )}
          <LfgListActionsMenu />
        </HeaderButtons>
      </View>
    );
  }, [enableFilters, endpoint, isLoggedIn, navigation]);

  const notificationHandler = useCallback(
    (event: WebSocketMessageEvent) => {
      const socketMessage = JSON.parse(event.data) as SocketNotificationData;
      if (SocketNotificationData.getType(socketMessage) === NotificationTypeData.fezUnreadMsg) {
        const invalidations = FezData.getCacheKeys().map(key => {
          return queryClient.invalidateQueries(key);
        });
        Promise.all(invalidations);
      } else {
        // This is kinda a lazy way out, but it works.
        // Not using onRefresh() so that we don't show the sudden refreshing circle.
        // Hopefully that's a decent idea.
        refetch();
      }
    },
    [queryClient, refetch],
  );

  useEffect(() => {
    if (notificationSocket && isFocused) {
      notificationSocket.addEventListener('message', notificationHandler);
    } else if (notificationSocket && !isFocused) {
      notificationSocket.removeEventListener('message', notificationHandler);
    }
    return () => {
      if (notificationSocket) {
        notificationSocket.removeEventListener('message', notificationHandler);
      }
    };
  }, [isFocused, notificationHandler, notificationSocket]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: getNavButtons,
    });
  }, [getNavButtons, navigation]);

  useEffect(() => {
    if (data && data.pages) {
      setFezList(data.pages.flatMap(p => p.fezzes));
    }
  }, [data]);

  if (!isLoggedIn) {
    return <NotLoggedInView />;
  }

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <AppView>
      <TimezoneWarningView />
      <LFGFlatList
        listRef={listRef}
        items={fezList}
        refreshControl={
          <RefreshControl refreshing={isFetching || isFetchingNextPage || isFetchingPreviousPage} onRefresh={refetch} />
        }
        separator={'day'}
        onScrollThreshold={onScrollThreshold}
        handleLoadNext={fetchNextPage}
        hasNextPage={hasNextPage}
        enableReportOnly={enableReportOnly}
        listHeader={listHeader}
      />
      {showFab && <LfgFAB showLabel={showFabLabel} />}
    </AppView>
  );
};
