import React from 'react';
import { AppView } from '@tricordarr/components/Views/AppView';
import { ScrollingContentView } from '@tricordarr/components/Views/Content/ScrollingContentView';
import { HelpTopicView } from '@tricordarr/components/Views/Help/HelpTopicView';
import { HelpChapterTitleView } from '@tricordarr/components/Views/Help/HelpChapterTitleView';

export const UserDirectoryHelpScreen = () => {
  return (
    <AppView>
      <ScrollingContentView isStack={true} overScroll={true}>
        <HelpChapterTitleView title={'General'} />
        <HelpTopicView>
          Use the directory to find other Twitarr users. Searches by username and Display Name. You must enter at least
          three characters to search.
        </HelpTopicView>
      </ScrollingContentView>
    </AppView>
  );
};
