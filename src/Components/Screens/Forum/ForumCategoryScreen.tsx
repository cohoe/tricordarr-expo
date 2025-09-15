import React, { useCallback, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ForumStackComponents, ForumStackParamList } from '@tricordarr/components/Navigation/Stacks/ForumStackNavigator';
import { View } from 'react-native';
import { MaterialHeaderButton } from '@tricordarr/components/Buttons/MaterialHeaderButton';
import { HeaderButtons } from 'react-navigation-header-buttons';
import { ForumThreadScreenFilterMenu } from '@tricordarr/components/Menus/Forum/ForumThreadScreenFilterMenu';
import { ForumThreadScreenSortMenu } from '@tricordarr/components/Menus/Forum/ForumThreadScreenSortMenu';
import { useFilter } from '@tricordarr/components/Context/Contexts/FilterContext';
import { ForumThreadsRelationsView } from '@tricordarr/components/Views/Forum/ForumThreadsRelationsView';
import { useIsFocused } from '@react-navigation/native';
import { usePrivilege } from '@tricordarr/components/Context/Contexts/PrivilegeContext';
import { AppView } from '@tricordarr/components/Views/AppView';
import { ForumFilter } from '@tricordarr/libraries/Enums/ForumSortFilter';
import { ForumCategoryScreenActionsMenu } from '@tricordarr/components/Menus/Forum/ForumCategoryScreenActionsMenu';
import { useForumCategoryQuery } from '@tricordarr/components/Queries/Forum/ForumCategoryQueries';
import { ForumListData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { LoadingView } from '@tricordarr/components/Views/Static/LoadingView';
import { useSelection } from '@tricordarr/components/Context/Contexts/SelectionContext';
import { ForumThreadListView } from '@tricordarr/components/Views/Forum/ForumThreadListView';
import { ForumEmptyListView } from '@tricordarr/components/Views/Forum/ForumEmptyListView';
import { ForumCategoryFAB } from '@tricordarr/components/Buttons/FloatingActionButtons/ForumCategoryFAB';
import { ForumSelectionHeaderButtons } from '@tricordarr/components/Buttons/HeaderButtons/ForumSelectionHeaderButtons';
import { ForumCategoryScreenSearchMenu } from '@tricordarr/components/Menus/Forum/ForumCategoryScreenSearchMenu';
import pluralize from 'pluralize';

type Props = NativeStackScreenProps<ForumStackParamList, ForumStackComponents.forumCategoryScreen>;

export const ForumCategoryScreen = ({ route, navigation }: Props) => {
  const { forumFilter } = useFilter();
  const isFocused = useIsFocused();
  const { clearPrivileges } = usePrivilege();
  const { forumSortOrder, forumSortDirection } = useFilter();
  const {
    data,
    refetch,
    hasPreviousPage,
    fetchPreviousPage,
    isFetchingPreviousPage,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useForumCategoryQuery(route.params.category.categoryID, {
    ...(forumSortOrder ? { sort: forumSortOrder } : undefined),
    ...(forumSortDirection ? { order: forumSortDirection } : undefined),
  });
  const [refreshing, setRefreshing] = useState(false);
  const [forumListData, setForumListData] = useState<ForumListData[]>([]);
  const [isUserRestricted, setIsUserRestricted] = useState(false);
  const { hasModerator } = usePrivilege();
  const { selectedForums, enableSelection } = useSelection();

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    if (data && data.pages) {
      setForumListData(data.pages.flatMap(p => p.forumThreads || []));

      const categoryData = data.pages[0];
      if (hasModerator) {
        setIsUserRestricted(false);
      } else {
        setIsUserRestricted(categoryData.isEventCategory || categoryData.isRestricted);
      }
    }
  }, [data, setForumListData, hasModerator]);

  const getNavButtons = useCallback(() => {
    if (enableSelection) {
      return (
        <View>
          <ForumSelectionHeaderButtons setRefreshing={setRefreshing} categoryID={route.params.category.categoryID} />
        </View>
      );
    }
    return (
      <View>
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <ForumCategoryScreenSearchMenu category={route.params.category} />
          <ForumThreadScreenSortMenu category={route.params.category} />
          <ForumThreadScreenFilterMenu />
          <ForumCategoryScreenActionsMenu />
        </HeaderButtons>
      </View>
    );
  }, [enableSelection, route.params.category]);

  useEffect(() => {
    // This clears the previous state of forum posts and a specific forum.
    if (isFocused) {
      clearPrivileges();
    }
    navigation.setOptions({
      headerRight: getNavButtons,
    });
    if (enableSelection) {
      navigation.setOptions({ title: `Selected: ${selectedForums.length}` });
    } else {
      navigation.setOptions({ title: 'Forums' });
    }
  }, [isFocused, getNavButtons, navigation, clearPrivileges, enableSelection, selectedForums.length]);

  if (isLoading || !data) {
    return <LoadingView />;
  }

  if (data?.pages[0].paginator.total === 0 && forumListData.length === 0) {
    return (
      <AppView>
        <ForumEmptyListView onRefresh={onRefresh} refreshing={refreshing} />
        {!isUserRestricted && <ForumCategoryFAB category={route.params.category} />}
      </AppView>
    );
  }

  if (forumFilter) {
    return (
      <AppView>
        <ForumThreadsRelationsView
          relationType={ForumFilter.toRelation(forumFilter)}
          category={route.params.category}
          title={route.params.category.title}
        />
        {!isUserRestricted && <ForumCategoryFAB category={route.params.category} />}
      </AppView>
    );
  }

  return (
    <AppView>
      <ForumThreadListView
        fetchPreviousPage={fetchPreviousPage}
        fetchNextPage={fetchNextPage}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        forumListData={forumListData}
        category={route.params.category}
        isFetchingPreviousPage={isFetchingPreviousPage}
        isFetchingNextPage={isFetchingNextPage}
        refreshing={refreshing}
        onRefresh={onRefresh}
        setRefreshing={setRefreshing}
        enableFAB={!isUserRestricted}
        title={route.params.category.title}
        subtitle={`${data.pages[0].paginator.total} ${pluralize('forum', data.pages[0].paginator.total)}`}
      />
    </AppView>
  );
};
