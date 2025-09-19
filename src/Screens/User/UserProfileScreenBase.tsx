import React, {useCallback, useEffect, useState} from 'react';
import {Text} from 'react-native-paper';
import {AppView} from '@tricordarr/../Views/AppView';
import {ProfilePublicData} from '@tricordarr/../../Libraries/Structs/ControllerStructs';
import {RefreshControl, View} from 'react-native';
import {ScrollingContentView} from '@tricordarr/../Views/Content/ScrollingContentView';
import {LoadingView} from '@tricordarr/../Views/Static/LoadingView';
import {PaddedContentView} from '@tricordarr/../Views/Content/PaddedContentView';
import {useStyles} from '@tricordarr/../Context/Contexts/StyleContext';
import {UserProfileScreenActionsMenu} from '@tricordarr/../Menus/User/UserProfileScreenActionsMenu.tsx';
import {AppIcons} from '@tricordarr/../../Libraries/Enums/Icons';
import {BlockedOrMutedBanner} from '@tricordarr/../Banners/BlockedOrMutedBanner';
import {UserContentCard} from '@tricordarr/../Cards/UserProfile/UserContentCard';
import {UserAboutCard} from '@tricordarr/../Cards/UserProfile/UserAboutCard';
import {UserProfileCard} from '@tricordarr/../Cards/UserProfile/UserProfileCard';
import {UserNoteCard} from '@tricordarr/../Cards/UserProfile/UserNoteCard';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {MaterialHeaderButton} from '@tricordarr/../Buttons/MaterialHeaderButton';
import {useAuth} from '@tricordarr/../Context/Contexts/AuthContext';
import {NotLoggedInView} from '@tricordarr/../Views/Static/NotLoggedInView';
import Clipboard from '@react-native-clipboard/clipboard';
import {UserProfileAvatar} from '@tricordarr/../Views/UserProfileAvatar';
import {ErrorView} from '@tricordarr/../Views/Static/ErrorView';
import {UserBylineTag} from '@tricordarr/../Text/Tags/UserBylineTag';
import {CommonStackComponents, useCommonStack} from '@tricordarr/../Navigation/CommonScreens';
import {HeaderProfileFavoriteButton} from '@tricordarr/../Buttons/HeaderButtons/HeaderProfileFavoriteButton.tsx';
import {HeaderProfileSeamailButton} from '@tricordarr/../Buttons/HeaderButtons/HeaderProfileSeamailButton.tsx';
import {UserProfileSelfActionsMenu} from '@tricordarr/../Menus/User/UserProfileSelfActionsMenu.tsx';
import {StyleSheet} from 'react-native';
import {useUserFavoritesQuery} from '@tricordarr/../Queries/Users/UserFavoriteQueries.ts';
import {useUserMutesQuery} from '@tricordarr/../Queries/Users/UserMuteQueries.ts';
import {useUserBlocksQuery} from '@tricordarr/../Queries/Users/UserBlockQueries.ts';
import {useUserProfileQuery} from '@tricordarr/../Queries/User/UserQueries.ts';

interface UserProfileScreenBaseProps {
  data?: ProfilePublicData;
  refetch: () => Promise<any>;
  isLoading: boolean;
  enableContent?: boolean;
  oobe?: boolean;
}
export const UserProfileScreenBase = ({
  data,
  refetch,
  isLoading,
  enableContent = true,
  oobe = false,
}: UserProfileScreenBaseProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const {data: profilePublicData, refetch: refetchSelf} = useUserProfileQuery();
  const {commonStyles} = useStyles();
  const [isMuted, setIsMuted] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const commonNavigation = useCommonStack();
  const {isLoggedIn} = useAuth();
  const {refetch: refetchFavorites} = useUserFavoritesQuery();
  const {data: mutes, refetch: refetchMutes} = useUserMutesQuery();
  const {data: blocks, refetch: refetchBlocks} = useUserBlocksQuery();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    let refreshes = [refetch(), refetchFavorites(), refetchMutes(), refetchBlocks()];
    if (data?.header.userID === profilePublicData?.header.userID) {
      refreshes.push(refetchSelf());
    }
    await Promise.all(refreshes);
    setRefreshing(false);
  }, [
    refetch,
    refetchFavorites,
    refetchMutes,
    refetchBlocks,
    data?.header.userID,
    profilePublicData?.header.userID,
    refetchSelf,
  ]);

  const getNavButtons = useCallback(() => {
    if (!isLoggedIn) {
      return <></>;
    }
    if (data && data?.header.userID === profilePublicData?.header.userID) {
      return (
        <View>
          <HeaderButtons left HeaderButtonComponent={MaterialHeaderButton}>
            <Item
              title={'Edit'}
              iconName={AppIcons.edituser}
              onPress={() =>
                commonNavigation.push(CommonStackComponents.userProfileEditScreen, {user: data, oobe: oobe})
              }
            />
            <UserProfileSelfActionsMenu />
          </HeaderButtons>
        </View>
      );
    }
    return (
      <View>
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          {data && (
            <>
              <HeaderProfileSeamailButton profile={data} />
              <HeaderProfileFavoriteButton profile={data} />
              <UserProfileScreenActionsMenu profile={data} isMuted={isMuted} isBlocked={isBlocked} oobe={oobe} />
            </>
          )}
        </HeaderButtons>
      </View>
    );
  }, [isLoggedIn, data, profilePublicData?.header.userID, isMuted, isBlocked, oobe, commonNavigation]);

  useEffect(() => {
    commonNavigation.setOptions({
      headerRight: getNavButtons,
    });
    // Reset the mute/block state before re-determining.
    setIsMuted(false);
    setIsBlocked(false);
    if (data) {
      // Determine if the user should be blocked, muted, etc.
      mutes?.map(mutedUserHeader => {
        if (mutedUserHeader.userID === data.header.userID) {
          setIsMuted(true);
        }
      });
      blocks?.map(blockedUserHeader => {
        if (blockedUserHeader.userID === data.header.userID) {
          setIsBlocked(true);
        }
      });
    }
  }, [blocks, getNavButtons, mutes, commonNavigation, data]);

  const styles = StyleSheet.create({
    listContentCenter: {
      ...commonStyles.flexRow,
      ...commonStyles.justifyCenter,
    },
    button: {
      ...commonStyles.marginHorizontalSmall,
    },
    titleText: {
      ...commonStyles.textCenter,
    },
  });

  if (!isLoggedIn) {
    return <NotLoggedInView />;
  }

  if (isLoading) {
    return <LoadingView />;
  }

  if (!data) {
    return <ErrorView refreshing={refreshing} onRefresh={onRefresh} />;
  }

  return (
    <AppView safeEdges={oobe ? ['bottom'] : []}>
      <ScrollingContentView
        isStack={true}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <BlockedOrMutedBanner muted={isMuted} blocked={isBlocked} />
        {data.message && (
          <PaddedContentView padTop={true} padBottom={false} style={styles.listContentCenter}>
            <Text selectable={true}>{data.message}</Text>
          </PaddedContentView>
        )}
        <PaddedContentView padTop={true} style={styles.listContentCenter}>
          <UserProfileAvatar user={data} setRefreshing={setRefreshing} />
        </PaddedContentView>
        <PaddedContentView style={styles.listContentCenter}>
          <Text selectable={true} variant={'headlineMedium'} style={styles.titleText}>
            <UserBylineTag user={data.header} includePronoun={false} variant={'headlineMedium'} />
          </Text>
        </PaddedContentView>
        {data.note && (
          <PaddedContentView>
            <UserNoteCard
              user={data}
              onPress={() => commonNavigation.push(CommonStackComponents.userPrivateNoteScreen, {user: data})}
              onLongPress={() => {
                if (data.note !== undefined) {
                  Clipboard.setString(data.note);
                }
              }}
            />
          </PaddedContentView>
        )}
        <PaddedContentView>
          <UserProfileCard user={data} />
        </PaddedContentView>
        {data.about && (
          <PaddedContentView>
            <UserAboutCard user={data} />
          </PaddedContentView>
        )}
        {enableContent && (
          <PaddedContentView>
            <UserContentCard user={data} />
          </PaddedContentView>
        )}
      </ScrollingContentView>
    </AppView>
  );
};
