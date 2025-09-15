import React from 'react';
import {ForumPostScreenBase} from '@tricordarr/components/Screens/Forum/Post/ForumPostScreenBase';

export const ForumPostFavoriteScreen = () => {
  return <ForumPostScreenBase refreshOnUserNotification={true} queryParams={{bookmarked: true}} />;
};
