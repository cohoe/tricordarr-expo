import React from 'react';
import {ForumPostScreenBase} from '@tricordarr/ForumPostScreenBase';

export const ForumPostMentionScreen = () => {
  return <ForumPostScreenBase refreshOnUserNotification={true} queryParams={{mentionself: true}} />;
};
