import React from 'react';
import {AppView} from '@tricordarr/../../Views/AppView';
import {ForumThreadSearchBar} from '@tricordarr/../../Search/ForumThreadSearchBar';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ForumStackComponents, ForumStackParamList} from '@tricordarr/../../Navigation/Stacks/ForumStackNavigator.tsx';
import {ListTitleView} from '@tricordarr/../../Views/ListTitleView.tsx';

export type Props = NativeStackScreenProps<ForumStackParamList, ForumStackComponents.forumThreadSearchScreen>;

export const ForumThreadSearchScreen = ({route}: Props) => {
  return (
    <AppView>
      {route.params.category && <ListTitleView title={route.params.category.title} />}
      <ForumThreadSearchBar category={route.params.category} />
    </AppView>
  );
};
