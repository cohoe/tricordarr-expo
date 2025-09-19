import React from 'react';
import {ForumRelationQueryType} from '@tricordarr/Queries/Forum/ForumThreadRelationQueries.ts';
import {ForumThreadsRelationsView} from '@tricordarr/Components/Views/Forum/ForumThreadsRelationsView';
import {AppView} from '@tricordarr/Components/Views/AppView.tsx';

export const ForumThreadRecentScreen = () => {
  return (
    <AppView>
      <ForumThreadsRelationsView relationType={ForumRelationQueryType.recent} />
    </AppView>
  );
};
