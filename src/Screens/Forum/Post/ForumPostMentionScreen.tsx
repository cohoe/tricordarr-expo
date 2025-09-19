import React from 'react';
import {ForumPostScreenBase} from '@tricordarr/Components/ForumPostScreenBase';

export const ForumPostMentionScreen = () => {
  return <ForumPostScreenBase refreshOnUserNotification={true} queryParams={{mentionself: true}} />;
};
