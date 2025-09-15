import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { AppView } from '@tricordarr/components/Views/AppView';
import { NotLoggedInView } from '@tricordarr/components/Views/Static/NotLoggedInView';
import { LoadingView } from '@tricordarr/components/Views/Static/LoadingView';
import { SeamailFAB } from '@tricordarr/components/Buttons/FloatingActionButtons/SeamailFAB';
import { useSeamailListQuery } from '@tricordarr/components/Queries/Fez/FezQueries';
import { usePrivilege } from '@tricordarr/components/Context/Contexts/PrivilegeContext';
import { useSocket } from '@tricordarr/components/Context/Contexts/SocketContext';
import { NotificationTypeData, SocketNotificationData } from '@tricordarr/libraries/Structs/SocketStructs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChatStackParamList, ChatStackScreenComponents } from '@tricordarr/components/Navigation/Stacks/ChatStackNavigator';
import { useIsFocused } from '@react-navigation/native';
import { SeamailFlatList } from '@tricordarr/components/Lists/Seamail/SeamailFlatList';
import { useAuth } from '@tricordarr/components/Context/Contexts/AuthContext';
import { MaterialHeaderButton } from '@tricordarr/components/Buttons/MaterialHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useStyles } from '@tricordarr/components/Context/Contexts/StyleContext';
import { SeamailAccountButtons } from '@tricordarr/components/Buttons/SegmentedButtons/SeamailAccountButtons';
import { SeamailListScreenActionsMenu } from '@tricordarr/components/Menus/Seamail/SeamailListScreenActionsMenu';
import { useUserNotificationDataQuery } from '@tricordarr/components/Queries/Alert/NotificationQueries';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { useQueryClient } from '@tanstack/react-query';
import { FezData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { useUserProfileQuery } from '@tricordarr/components/Queries/User/UserQueries';

type SeamailListScreenProps = NativeStackScreenProps<ChatStackParamList, ChatStackScreenComponents.seamailListScreen>;

export const SeamailListScreen = ({ navigation }: SeamailListScreenProps) => {
  const { hasTwitarrTeam, hasModerator, asPrivilegedUser } = usePrivilege();
  const { data, refetch, isFetchingNextPage, hasNextPage, fetchNextPage, isRefetching, isLoading } = useSeamailListQuery({
    forUser: asPrivilegedUser,
  });
  const { notificationSocket, closeFezSocket } = useSocket();
  const isFocused = useIsFocused();
  const { isLoggedIn } = useAuth();
  const { refetch: refetchUserNotificationData } = useUserNotificationDataQuery();
  const { commonStyles } = useStyles();
  const { data: profilePublicData } = useUserProfileQuery();
  const [showFabLabel, setShowFabLabel] = useState(true);
  const [fezList, setFezList] = useState<FezData[]>([]);
  const onScrollThreshold = (hasScrolled: boolean) => setShowFabLabel(!hasScrolled);
  const queryClient = useQueryClient();

  const handleLoadNext = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (data && data.pages) {
      setFezList(data.pages.flatMap(p => p.fezzes));
    }
  }, [data]);

  const onRefresh = useCallback(() => {
    refetch().finally(() => {
      refetchUserNotificationData();
    });
  }, [refetch, refetchUserNotificationData]);

  const notificationHandler = useCallback(
    (event: WebSocketMessageEvent) => {
      const socketMessage = JSON.parse(event.data) as SocketNotificationData;
      if (SocketNotificationData.getType(socketMessage) === NotificationTypeData.seamailUnreadMsg) {
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
      // }
    },
    [queryClient, refetch],
  );

  const getNavButtons = useCallback(() => {
    return (
      <View>
        <HeaderButtons left HeaderButtonComponent={MaterialHeaderButton}>
          <Item
            title={'Search'}
            iconName={AppIcons.seamailSearch}
            onPress={() =>
              navigation.push(ChatStackScreenComponents.seamailSearchScreen, {
                forUser: asPrivilegedUser,
              })
            }
          />
          <SeamailListScreenActionsMenu />
        </HeaderButtons>
      </View>
    );
  }, [asPrivilegedUser, navigation]);

  useEffect(() => {
    if (notificationSocket) {
      notificationSocket.addEventListener('message', notificationHandler);
    }
    return () => {
      if (notificationSocket) {
        notificationSocket.removeEventListener('message', notificationHandler);
      }
    };
  }, [notificationHandler, notificationSocket]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: getNavButtons,
    });
  }, [isFocused, closeFezSocket, navigation, getNavButtons]);

  if (!isLoggedIn) {
    return <NotLoggedInView />;
  }

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <AppView>
      {profilePublicData && (hasTwitarrTeam || hasModerator) && (
        // For some reason, SegmentedButtons hates the flex in PaddedContentView.
        <View style={[commonStyles.margin]}>
          <SeamailAccountButtons />
        </View>
      )}
      <SeamailFlatList
        fezList={fezList}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />}
        onEndReached={handleLoadNext}
        onScrollThreshold={onScrollThreshold}
        hasNextPage={hasNextPage}
        handleLoadNext={handleLoadNext}
      />
      <SeamailFAB showLabel={showFabLabel} />
    </AppView>
  );
};
