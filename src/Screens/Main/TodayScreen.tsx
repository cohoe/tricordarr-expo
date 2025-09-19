import React, {useCallback, useEffect, useState} from 'react';
import {AppView} from '@tricordarr/../Views/AppView';
import {ScrollingContentView} from '@tricordarr/../Views/Content/ScrollingContentView';
import {PaddedContentView} from '@tricordarr/../Views/Content/PaddedContentView';
import {MainStackComponents, MainStackParamList} from '@tricordarr/../Navigation/Stacks/MainStackNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDrawer} from '@tricordarr/../Context/Contexts/DrawerContext';
import {TodayAnnouncementView} from '@tricordarr/../Views/Today/TodayAnnouncementView.tsx';
import {RefreshControl, View} from 'react-native';
import {useDailyThemeQuery} from '@tricordarr/../Queries/Alert/DailyThemeQueries.ts';
import {useAnnouncementsQuery} from '@tricordarr/../Queries/Alert/AnnouncementQueries.ts';
import {useUserFavoritesQuery} from '@tricordarr/../Queries/Users/UserFavoriteQueries.ts';
import {useUserMutesQuery} from '@tricordarr/../Queries/Users/UserMuteQueries.ts';
import {useUserBlocksQuery} from '@tricordarr/../Queries/Users/UserBlockQueries.ts';
import {useUserNotificationDataQuery} from '@tricordarr/../Queries/Alert/NotificationQueries';
import {useAuth} from '@tricordarr/../Context/Contexts/AuthContext';
import {ModeratorCard} from '@tricordarr/../Cards/MainScreen/ModeratorCard';
import {usePrivilege} from '@tricordarr/../Context/Contexts/PrivilegeContext';
import {TodayThemeView} from '@tricordarr/../Views/Today/TodayThemeView.tsx';
import {TodayNextAppointmentView} from '@tricordarr/../Views/Today/TodayNextAppointmentView.tsx';
import {MainAccountMenu} from '@tricordarr/../Menus/MainAccountMenu';
import {TodayHeaderView} from '@tricordarr/../Views/Today/TodayHeaderView.tsx';
import {TodayHeaderTitle} from '@tricordarr/../Navigation/Components/TodayHeaderTitle';
import {TodayTimezoneWarningView} from '@tricordarr/../Views/Today/TodayTimezoneWarningView.tsx';
import {TodayAppUpdateView} from '@tricordarr/../Views/TodayAppUpdateView.tsx';
import {useClientConfigQuery} from '@tricordarr/../Queries/Client/ClientQueries.ts';
import {NotificationsMenu} from '@tricordarr/../Menus/NotificationsMenu.tsx';
import {MaterialHeaderButton} from '@tricordarr/../Buttons/MaterialHeaderButton.tsx';
import {HeaderButtons} from 'react-navigation-header-buttons';
import {useUserProfileQuery} from '@tricordarr/../Queries/User/UserQueries.ts';

type Props = NativeStackScreenProps<MainStackParamList, MainStackComponents.mainScreen>;

export const TodayScreen = ({navigation}: Props) => {
  const {getLeftMainHeaderButtons} = useDrawer();
  // These queries are disabled to prevent bombarding the server on app launch. Some will fire anyway such as themes or
  // announcements but typically have a higher than usual stale time.
  // The rest are here for pull-to-refetch.
  // The exception is UserNotificationData because that needs to more aggressively re-fire. But because I put it in
  // state rather than reference the query it rarely organically refetches.
  const {refetch: refetchThemes} = useDailyThemeQuery({enabled: false});
  const {refetch: refetchAnnouncements} = useAnnouncementsQuery({enabled: false});
  const {refetch: refetchFavorites} = useUserFavoritesQuery({enabled: false});
  const {refetch: refetchMutes} = useUserMutesQuery({enabled: false});
  const {refetch: refetchBlocks} = useUserBlocksQuery({enabled: false});
  const {refetch: refetchUserNotificationData} = useUserNotificationDataQuery({enabled: false});
  const {refetch: refetchClient} = useClientConfigQuery({enabled: false});
  const {refetch: refetchProfile} = useUserProfileQuery({enabled: false});
  const {isLoggedIn} = useAuth();
  const {hasModerator} = usePrivilege();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchUserNotificationData(), refetchThemes(), refetchAnnouncements(), refetchClient()]);
    if (isLoggedIn) {
      await Promise.all([refetchProfile(), refetchFavorites(), refetchBlocks(), refetchMutes()]);
    }
    setRefreshing(false);
  };

  const getRightMainHeaderButtons = useCallback(() => {
    return (
      <View>
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          {isLoggedIn && <NotificationsMenu />}
          <MainAccountMenu />
        </HeaderButtons>
      </View>
    );
  }, [isLoggedIn]);

  const getTitle = useCallback(() => <TodayHeaderTitle />, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: getLeftMainHeaderButtons,
      headerRight: getRightMainHeaderButtons,
      headerTitle: getTitle,
    });
  }, [getLeftMainHeaderButtons, getRightMainHeaderButtons, getTitle, navigation]);

  return (
    <AppView>
      <ScrollingContentView
        isStack={true}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <TodayHeaderView />
        <TodayTimezoneWarningView />
        <TodayAnnouncementView />
        <TodayThemeView />
        <TodayNextAppointmentView />
        {hasModerator && (
          <PaddedContentView padBottom={false}>
            <ModeratorCard />
          </PaddedContentView>
        )}
        <TodayAppUpdateView />
      </ScrollingContentView>
    </AppView>
  );
};
