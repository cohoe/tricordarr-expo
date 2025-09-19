import React from 'react';
import {ForumPostScreenBase} from '@tricordarr/ForumPostScreenBase';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommonStackComponents, CommonStackParamList} from '@tricordarr/../../Navigation/CommonScreens';

type Props = NativeStackScreenProps<CommonStackParamList, CommonStackComponents.forumPostUserScreen>;

export const ForumPostUserScreen = ({route}: Props) => {
  return (
    <ForumPostScreenBase
      refreshOnUserNotification={true}
      queryParams={{creatorid: route.params.user.userID}}
      title={`Posts by @${route.params.user.username}`}
    />
  );
};
