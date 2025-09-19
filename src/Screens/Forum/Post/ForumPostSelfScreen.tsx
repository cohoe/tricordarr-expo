import React from 'react';
import {ForumPostScreenBase} from '@tricordarr/ForumPostScreenBase';

export const ForumPostSelfScreen = () => {
  return <ForumPostScreenBase refreshOnUserNotification={true} queryParams={{byself: true}} />;
};
