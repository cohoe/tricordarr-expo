import React, {useCallback, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ForumStackComponents, ForumStackParamList} from '@tricordarr/Components/Navigation/Stacks/ForumStackNavigator';
import {View} from 'react-native';
import {MaterialHeaderButton} from '@tricordarr/Components/Buttons/MaterialHeaderButton';
import {HeaderButtons} from 'react-navigation-header-buttons';
import {ForumThreadScreenSortMenu} from '@tricordarr/Components/Menus/Forum/ForumThreadScreenSortMenu';
import {ForumThreadsRelationsView} from '@tricordarr/Components/Views/Forum/ForumThreadsRelationsView';
import {ForumRelationQueryType} from '@tricordarr/Queries/Forum/ForumThreadRelationQueries.ts';
import {AppView} from '@tricordarr/Components/Views/AppView.tsx';

type Props = NativeStackScreenProps<ForumStackParamList, ForumStackComponents.forumMutesScreen>;

export const ForumThreadMutesScreen = ({navigation}: Props) => {
  const getNavButtons = useCallback(() => {
    return (
      <View>
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <ForumThreadScreenSortMenu />
        </HeaderButtons>
      </View>
    );
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: getNavButtons,
    });
  }, [getNavButtons, navigation]);

  return (
    <AppView>
      <ForumThreadsRelationsView relationType={ForumRelationQueryType.mutes} />
    </AppView>
  );
};
