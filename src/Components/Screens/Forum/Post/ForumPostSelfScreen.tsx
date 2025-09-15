import React from 'react';
import {ForumPostScreenBase} from '@tricordarr/components/Screens/Forum/Post/ForumPostScreenBase';

export const ForumPostSelfScreen = () => {
  return <ForumPostScreenBase refreshOnUserNotification={true} queryParams={{byself: true}} />;
};
