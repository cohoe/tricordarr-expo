import React from 'react';
import { ForumRelationQueryType } from '@tricordarr/components/Queries/Forum/ForumThreadRelationQueries';
import { ForumThreadsRelationsView } from '@tricordarr/components/Views/Forum/ForumThreadsRelationsView';
import { AppView } from '@tricordarr/components/Views/AppView';

export const ForumThreadRecentScreen = () => {
  return (
    <AppView>
      <ForumThreadsRelationsView relationType={ForumRelationQueryType.recent} />
    </AppView>
  );
};
