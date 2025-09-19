import {AppView} from '@tricordarr/Components/Views/AppView';
import {BoardgameFlatList} from '@tricordarr/Components/Lists/BoardgameFlatList';
import {useBoardgameExpansionsQuery, useBoardgamesQuery} from '@tricordarr/Queries/Boardgames/BoardgameQueries';
import {NotLoggedInView} from '@tricordarr/Components/Views/Static/NotLoggedInView';
import {LoadingView} from '@tricordarr/Components/Views/Static/LoadingView';
import React, {useCallback, useEffect, useState} from 'react';
import {useAuth} from '@tricordarr/Components/Context/Contexts/AuthContext';
import {RefreshControl, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackComponents, MainStackParamList} from '@tricordarr/Components/Navigation/Stacks/MainStackNavigator';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {MaterialHeaderButton} from '@tricordarr/Components/Buttons/MaterialHeaderButton';
import {AppIcons} from '@tricordarr/Libraries/Enums/Icons';
import {MenuAnchor} from '@tricordarr/Components/Menus/MenuAnchor';
import {ListTitleView} from '@tricordarr/Components/Views/ListTitleView';
import {BoardgameGuideFAB} from '@tricordarr/Components/Buttons/FloatingActionButtons/BoardgameGuideFAB';

type Props = NativeStackScreenProps<MainStackParamList, MainStackComponents.boardgameExpansionsScreen>;

export const BoardgameExpansionsScreen = ({navigation, route}: Props) => {
  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
    hasPreviousPage,
    fetchPreviousPage,
    isFetchingPreviousPage,
    refetch,
    isFetching,
  } = useBoardgameExpansionsQuery({boardgameID: route.params.boardgameID});
  const {isLoggedIn} = useAuth();

  const handleLoadNext = async () => {
    if (!isFetchingNextPage && hasNextPage) {
      await fetchNextPage();
    }
  };

  const handleLoadPrevious = async () => {
    if (!isFetchingPreviousPage && hasPreviousPage) {
      await fetchPreviousPage();
    }
  };

  const getNavButtons = useCallback(
    () => (
      <View>
        <HeaderButtons left HeaderButtonComponent={MaterialHeaderButton}>
          <Item
            title={'Help'}
            iconName={AppIcons.help}
            onPress={() => navigation.push(MainStackComponents.boardgameHelpScreen)}
          />
        </HeaderButtons>
      </View>
    ),
    [navigation],
  );

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

  const items = data?.pages.flatMap(p => p.gameArray) || [];

  return (
    <AppView>
      <BoardgameFlatList
        items={items}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        handleLoadNext={handleLoadNext}
        handleLoadPrevious={handleLoadPrevious}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
      />
    </AppView>
  );
};
