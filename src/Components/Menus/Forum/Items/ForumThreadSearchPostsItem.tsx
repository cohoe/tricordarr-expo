import {AppIcons} from '@tricordarr/Libraries/Enums/Icons';
import {CommonStackComponents, CommonStackParamList} from '@tricordarr/Components/Navigation/CommonScreens';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Item} from 'react-navigation-header-buttons';
import {ForumData, ForumListData} from '@tricordarr/Libraries/Structs/ControllerStructs.tsx';

interface ForumThreadSearchPostsItemProps {
  navigation: NativeStackNavigationProp<CommonStackParamList>;
  forum: ForumListData | ForumData;
}

export const ForumThreadSearchPostsItem = ({navigation, forum}: ForumThreadSearchPostsItemProps) => {
  return (
    <Item
      title={'Search Posts'}
      iconName={AppIcons.postSearch}
      onPress={() => {
        navigation.push(CommonStackComponents.forumPostSearchScreen, {
          forum: forum,
        });
      }}
    />
  );
};
