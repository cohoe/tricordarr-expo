import React from 'react';
import { AppView } from '@tricordarr/components/Views/AppView';
import { ForumThreadSearchBar } from '@tricordarr/components/Search/ForumThreadSearchBar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ForumStackComponents, ForumStackParamList } from '@tricordarr/components/Navigation/Stacks/ForumStackNavigator';
import { ListTitleView } from '@tricordarr/components/Views/ListTitleView';

export type Props = NativeStackScreenProps<ForumStackParamList, ForumStackComponents.forumThreadSearchScreen>;

export const ForumThreadSearchScreen = ({ route }: Props) => {
  return (
    <AppView>
      {route.params.category && <ListTitleView title={route.params.category.title} />}
      <ForumThreadSearchBar category={route.params.category} />
    </AppView>
  );
};
