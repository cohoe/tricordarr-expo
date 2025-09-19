import React from 'react';
import {ForumPostScreenBase} from '@tricordarr/ForumPostScreenBase';

export const ForumPostFavoriteScreen = () => {
  return <ForumPostScreenBase refreshOnUserNotification={true} queryParams={{bookmarked: true}} />;
};
