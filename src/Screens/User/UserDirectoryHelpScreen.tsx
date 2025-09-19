import React from 'react';
import {AppView} from '@tricordarr/../Views/AppView.tsx';
import {ScrollingContentView} from '@tricordarr/../Views/Content/ScrollingContentView.tsx';
import {HelpTopicView} from '@tricordarr/../Views/Help/HelpTopicView.tsx';
import {HelpChapterTitleView} from '@tricordarr/../Views/Help/HelpChapterTitleView.tsx';

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
