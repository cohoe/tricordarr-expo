import React from 'react';
import {ForumPostScreenBase} from '@tricordarr/Components/ForumPostScreenBase';

export const ForumPostFavoriteScreen = () => {
  return <ForumPostScreenBase refreshOnUserNotification={true} queryParams={{bookmarked: true}} />;
};
