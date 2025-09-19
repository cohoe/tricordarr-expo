import {AppView} from '@tricordarr/Components/Views/AppView';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {PerformerType, usePerformersQuery} from '@tricordarr/Queries/Performer/PerformerQueries';
import {PerformerHeaderData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {FlatList, RefreshControl, View, StyleSheet} from 'react-native';
import {AppFlatList} from '@tricordarr/Components/Lists/AppFlatList';
import {LoadingView} from '@tricordarr/Components/Views/Static/LoadingView';
import {PerformerTypeButtons} from '@tricordarr/Components/Buttons/SegmentedButtons/PerformerTypeButtons';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackComponents, MainStackParamList} from '@tricordarr/Components/Navigation/Stacks/MainStackNavigator';
import {PerformerHeaderCard} from '@tricordarr/Components/Cards/Performer/PerformerHeaderCard';
import {useStyles} from '@tricordarr/Components/Context/Contexts/StyleContext';
import {HeaderButtons} from 'react-navigation-header-buttons';
import {MaterialHeaderButton} from '@tricordarr/Components/Buttons/MaterialHeaderButton';
import {PerformerListActionsMenu} from '@tricordarr/Components/Menus/Performer/PerformerListActionsMenu';
import {useAuth} from '@tricordarr/Components/Context/Contexts/AuthContext';
import {NotLoggedInView} from '@tricordarr/Components/Views/Static/NotLoggedInView';

type Props = NativeStackScreenProps<MainStackParamList, MainStackComponents.performerListScreen>;

export const PerformerListScreen = ({navigation, route}: Props) => {
  const [performerType, setPerformerType] = useState<PerformerType>(route.params?.performerType || 'official');
  const {data, refetch, isFetching, hasNextPage, fetchNextPage, isLoading} = usePerformersQuery(performerType);
  const flatListRef = useRef<FlatList<PerformerHeaderData>>(null);
  const {commonStyles, styleDefaults} = useStyles();
  const {isLoggedIn} = useAuth();

  const styles = StyleSheet.create({
    cardContainer: {
      width: 180,
    },
    column: {
      ...commonStyles.justifySpaceEvenly,
    },
    content: {
      gap: styleDefaults.marginSize,
    },
    list: {
      ...commonStyles.paddingVertical,
    },
  });

  const renderItem = useCallback(
    ({item}: {item: PerformerHeaderData}) => {
      return (
        <View style={styles.cardContainer}>
          <PerformerHeaderCard header={item} />
        </View>
      );
    },
    [styles.cardContainer],
  );

  const renderListHeader = useCallback(() => {
    return (
      <PaddedContentView padTop={true}>
        <PerformerTypeButtons performerType={performerType} setPerformerType={setPerformerType} />
      </PaddedContentView>
    );
  }, [performerType]);

  const renderListFooter = useCallback(() => <PaddedContentView />, []);

  const getHeaderButtons = useCallback(() => {
    return (
      <View>
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <PerformerListActionsMenu />
        </HeaderButtons>
      </View>
    );
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: getHeaderButtons,
    });
  }, [navigation, getHeaderButtons]);

  const performers = data?.pages.flatMap(p => p.performers) || [];

  if (!isLoggedIn) {
    return <NotLoggedInView />;
  }

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <AppView>
      <AppFlatList
        flatListRef={flatListRef}
        renderItem={renderItem}
        data={performers}
        hasNextPage={hasNextPage}
        handleLoadNext={fetchNextPage}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        renderListHeader={renderListHeader}
        renderListFooter={renderListFooter}
        numColumns={2}
        contentContainerStyle={styles.content}
        columnWrapperStyle={styles.column}
        maintainViewPosition={false}
      />
    </AppView>
  );
};
