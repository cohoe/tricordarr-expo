import React, { useCallback, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ForumStackComponents, ForumStackParamList } from '@tricordarr/components/Navigation/Stacks/ForumStackNavigator';
import { View } from 'react-native';
import { MaterialHeaderButton } from '@tricordarr/components/Buttons/MaterialHeaderButton';
import { HeaderButtons } from 'react-navigation-header-buttons';
import { ForumThreadScreenSortMenu } from '@tricordarr/components/Menus/Forum/ForumThreadScreenSortMenu';
import { ForumThreadsRelationsView } from '@tricordarr/components/Views/Forum/ForumThreadsRelationsView';
import { ForumRelationQueryType } from '@tricordarr/components/Queries/Forum/ForumThreadRelationQueries';
import { AppView } from '@tricordarr/components/Views/AppView';

type Props = NativeStackScreenProps<ForumStackParamList, ForumStackComponents.forumMutesScreen>;

export const ForumThreadMutesScreen = ({ navigation }: Props) => {
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
