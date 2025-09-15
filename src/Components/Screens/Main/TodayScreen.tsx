import React, { useCallback, useEffect, useState } from 'react';
import { AppView } from '@tricordarr/components/Views/AppView';
import { ScrollingContentView } from '@tricordarr/components/Views/Content/ScrollingContentView';
import { PaddedContentView } from '@tricordarr/components/Views/Content/PaddedContentView';
import { MainStackComponents, MainStackParamList } from '@tricordarr/components/Navigation/Stacks/MainStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDrawer } from '@tricordarr/components/Context/Contexts/DrawerContext';
import { TodayAnnouncementView } from '@tricordarr/components/Views/Today/TodayAnnouncementView';
import { RefreshControl, View } from 'react-native';
import { useDailyThemeQuery } from '@tricordarr/components/Queries/Alert/DailyThemeQueries';
import { useAnnouncementsQuery } from '@tricordarr/components/Queries/Alert/AnnouncementQueries';
import { useUserFavoritesQuery } from '@tricordarr/components/Queries/Users/UserFavoriteQueries';
import { useUserMutesQuery } from '@tricordarr/components/Queries/Users/UserMuteQueries';
import { useUserBlocksQuery } from '@tricordarr/components/Queries/Users/UserBlockQueries';
import { useUserNotificationDataQuery } from '@tricordarr/components/Queries/Alert/NotificationQueries';
import { useAuth } from '@tricordarr/components/Context/Contexts/AuthContext';
import { ModeratorCard } from '@tricordarr/components/Cards/MainScreen/ModeratorCard';
import { usePrivilege } from '@tricordarr/components/Context/Contexts/PrivilegeContext';
import { TodayThemeView } from '@tricordarr/components/Views/Today/TodayThemeView';
import { TodayNextAppointmentView } from '@tricordarr/components/Views/Today/TodayNextAppointmentView';
import { MainAccountMenu } from '@tricordarr/components/Menus/MainAccountMenu';
import { TodayHeaderView } from '@tricordarr/components/Views/Today/TodayHeaderView';
import { TodayHeaderTitle } from '@tricordarr/components/Navigation/Components/TodayHeaderTitle';
import { TodayTimezoneWarningView } from '@tricordarr/components/Views/Today/TodayTimezoneWarningView';
import { TodayAppUpdateView } from '@tricordarr/components/Views/TodayAppUpdateView';
import { useClientConfigQuery } from '@tricordarr/components/Queries/Client/ClientQueries';
import { NotificationsMenu } from '@tricordarr/components/Menus/NotificationsMenu';
import { MaterialHeaderButton } from '@tricordarr/components/Buttons/MaterialHeaderButton';
import { HeaderButtons } from 'react-navigation-header-buttons';
import { useUserProfileQuery } from '@tricordarr/components/Queries/User/UserQueries';

type Props = NativeStackScreenProps<MainStackParamList, MainStackComponents.mainScreen>;

export const TodayScreen = ({ navigation }: Props) => {
  const { getLeftMainHeaderButtons } = useDrawer();
  // These queries are disabled to prevent bombarding the server on app launch. Some will fire anyway such as themes or
  // announcements but typically have a higher than usual stale time.
  // The rest are here for pull-to-refetch.
  // The exception is UserNotificationData because that needs to more aggressively re-fire. But because I put it in
  // state rather than reference the query it rarely organically refetches.
  const { refetch: refetchThemes } = useDailyThemeQuery({ enabled: false });
  const { refetch: refetchAnnouncements } = useAnnouncementsQuery({ enabled: false });
  const { refetch: refetchFavorites } = useUserFavoritesQuery({ enabled: false });
  const { refetch: refetchMutes } = useUserMutesQuery({ enabled: false });
  const { refetch: refetchBlocks } = useUserBlocksQuery({ enabled: false });
  const { refetch: refetchUserNotificationData } = useUserNotificationDataQuery({ enabled: false });
  const { refetch: refetchClient } = useClientConfigQuery({ enabled: false });
  const { refetch: refetchProfile } = useUserProfileQuery({ enabled: false });
  const { isLoggedIn } = useAuth();
  const { hasModerator } = usePrivilege();
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
