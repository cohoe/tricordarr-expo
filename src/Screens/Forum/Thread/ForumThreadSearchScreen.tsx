import React from 'react';
import {AppView} from '@tricordarr/Components/Views/AppView';
import {ForumThreadSearchBar} from '@tricordarr/Components/Search/ForumThreadSearchBar';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ForumStackComponents, ForumStackParamList} from '@tricordarr/Components/Navigation/Stacks/ForumStackNavigator';
import {ListTitleView} from '@tricordarr/Components/Views/ListTitleView';

export type Props = NativeStackScreenProps<ForumStackParamList, ForumStackComponents.forumThreadSearchScreen>;

export const ForumThreadSearchScreen = ({route}: Props) => {
  return (
    <AppView>
      {route.params.category && <ListTitleView title={route.params.category.title} />}
      <ForumThreadSearchBar category={route.params.category} />
    </AppView>
  );
};
