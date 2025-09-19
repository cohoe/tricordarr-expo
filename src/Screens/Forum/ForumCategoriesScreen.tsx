import React, {useCallback, useEffect, useState} from 'react';
import {AppView} from '@tricordarr/../Views/AppView';
import {ScrollingContentView} from '@tricordarr/../Views/Content/ScrollingContentView';
import {useForumCategoriesQuery} from '@tricordarr/../Queries/Forum/ForumCategoryQueries.ts';
import {RefreshControl, View} from 'react-native';
import {LoadingView} from '@tricordarr/../Views/Static/LoadingView';
import {Divider} from 'react-native-paper';
import {ListSection} from '@tricordarr/../Lists/ListSection';
import {ForumCategoryListItem} from '@tricordarr/../Lists/Items/Forum/ForumCategoryListItem';
import {ForumCategoryListItemBase} from '@tricordarr/../Lists/Items/Forum/ForumCategoryListItemBase';
import {ForumMentionsCategoryListItem} from '@tricordarr/../Lists/Items/Forum/ForumMentionsCategoryListItem';
import {NotLoggedInView} from '@tricordarr/../Views/Static/NotLoggedInView';
import {useAuth} from '@tricordarr/../Context/Contexts/AuthContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ForumStackComponents, ForumStackParamList} from '@tricordarr/../Navigation/Stacks/ForumStackNavigator';
import {useIsFocused} from '@react-navigation/native';
import {usePrivilege} from '@tricordarr/../Context/Contexts/PrivilegeContext';
import {ForumCategoriesScreenActionsMenu} from '@tricordarr/../Menus/Forum/ForumCategoriesScreenActionsMenu';
import {MaterialHeaderButton} from '@tricordarr/../Buttons/MaterialHeaderButton';
import {HeaderButtons} from 'react-navigation-header-buttons';
import {useUserKeywordQuery} from '@tricordarr/../Queries/User/UserQueries.ts';
import {ForumAlertwordListItem} from '@tricordarr/../Lists/Items/Forum/ForumAlertwordListItem';
import {ListSubheader} from '@tricordarr/../Lists/ListSubheader';
import {useUserNotificationDataQuery} from '@tricordarr/../Queries/Alert/NotificationQueries';
import {ForumCategoriesScreenSearchMenu} from '@tricordarr/../Menus/Forum/ForumCategoriesScreenSearchMenu.tsx';

type Props = NativeStackScreenProps<ForumStackParamList, ForumStackComponents.forumCategoriesScreen>;
export const ForumCategoriesScreen = ({navigation}: Props) => {
  const {data, refetch, isLoading} = useForumCategoriesQuery();
  const [refreshing, setRefreshing] = useState(false);
  const {refetch: refetchUserNotificationData} = useUserNotificationDataQuery();
  const {isLoggedIn} = useAuth();
  const isFocused = useIsFocused();
  const {clearPrivileges} = usePrivilege();
  const {data: keywordData, refetch: refetchKeywordData} = useUserKeywordQuery({
    keywordType: 'alertwords',
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetch(), refetchUserNotificationData(), refetchKeywordData()]);
    setRefreshing(false);
  }, [refetch, refetchKeywordData, refetchUserNotificationData]);

  const getNavButtons = useCallback(() => {
    return (
      <View>
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <ForumCategoriesScreenSearchMenu />
          <ForumCategoriesScreenActionsMenu />
        </HeaderButtons>
      </View>
    );
  }, []);

  useEffect(() => {
    // This clears the previous state of forum posts, specific forum, and the category list data.
    if (isFocused) {
      clearPrivileges();
    }
  }, [clearPrivileges, isFocused]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: getNavButtons,
    });
  }, [getNavButtons, navigation]);

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
        overScroll={true}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh || isLoading} />}>
        <View>
          {data && (
            <ListSection>
              <ListSubheader>Forum Categories</ListSubheader>
              {data.map((category, index) => {
                return (
                  <React.Fragment key={category.categoryID}>
                    {index === 0 && <Divider bold={true} />}
                    <ForumCategoryListItem category={category} />
                    <Divider bold={true} />
                  </React.Fragment>
                );
              })}
            </ListSection>
          )}
          <ListSection>
            <ListSubheader>Personal Categories</ListSubheader>
            <Divider bold={true} />
            <ForumCategoryListItemBase
              title={'Favorite Forums'}
              onPress={() => navigation.push(ForumStackComponents.forumFavoritesScreen)}
              description={'Forums that you have favorited for easy access.'}
            />
            <Divider bold={true} />
            <ForumCategoryListItemBase
              title={'Recent Forums'}
              onPress={() => navigation.push(ForumStackComponents.forumRecentScreen)}
              description={'Forums that you have viewed recently.'}
            />
            <Divider bold={true} />
            <ForumCategoryListItemBase
              title={'Your Forums'}
              onPress={() => navigation.push(ForumStackComponents.forumOwnedScreen)}
              description={'Forums that you created.'}
            />
            <Divider bold={true} />
            <ForumCategoryListItemBase
              title={'Muted Forums'}
              onPress={() => navigation.push(ForumStackComponents.forumMutesScreen)}
              description={'Forums that you have muted.'}
            />
            <Divider bold={true} />
            <ForumMentionsCategoryListItem />
            <Divider bold={true} />
            <ForumCategoryListItemBase
              title={'Favorite Posts'}
              onPress={() => navigation.push(ForumStackComponents.forumPostFavoriteScreen)}
              description={'Posts that you have saved from forums.'}
            />
            <Divider bold={true} />
            <ForumCategoryListItemBase
              title={'Your Posts'}
              onPress={() => navigation.push(ForumStackComponents.forumPostSelfScreen)}
              description={'Posts that you have made in forums.'}
            />
            <Divider bold={true} />
          </ListSection>
          <ListSection>
            <ListSubheader>Alert Keywords</ListSubheader>
            <Divider bold={true} />
            {keywordData && keywordData.keywords.length > 0 ? (
              keywordData.keywords.map(alertWord => {
                return (
                  <React.Fragment key={alertWord}>
                    <ForumAlertwordListItem alertword={alertWord} />
                    <Divider bold={true} />
                  </React.Fragment>
                );
              })
            ) : (
              <ForumCategoryListItemBase
                title={'No Keywords Configured'}
                description={'You can configure alert and mute keywords using the menu in the upper right.'}
              />
            )}
          </ListSection>
        </View>
      </ScrollingContentView>
    </AppView>
  );
};
