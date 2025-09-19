import React from 'react';
import {ForumPostScreenBase} from '@tricordarr/Screens/Forum/Post/ForumPostScreenBase';

export const ForumPostSelfScreen = () => {
  return <ForumPostScreenBase refreshOnUserNotification={true} queryParams={{byself: true}} />;
};
