import React from 'react';
import {ForumPostScreenBase} from '@tricordarr/components/Screens/Forum/Post/ForumPostScreenBase';

export const ForumPostMentionScreen = () => {
  return <ForumPostScreenBase refreshOnUserNotification={true} queryParams={{mentionself: true}} />;
};
