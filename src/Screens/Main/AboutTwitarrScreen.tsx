import React from 'react';
import {AppView} from '@tricordarr/../Views/AppView';
import {ScrollingContentView} from '@tricordarr/../Views/Content/ScrollingContentView';
import {useHelpTextQuery} from '@tricordarr/../Queries/PublicQueries';
import {RefreshControl} from 'react-native';
import {LoadingView} from '@tricordarr/../Views/Static/LoadingView';
import {ContentText} from '@tricordarr/../Text/ContentText.tsx';
import {PaddedContentView} from '@tricordarr/../Views/Content/PaddedContentView.tsx';

export const AboutTwitarrScreen = () => {
  const {data, refetch, isFetching} = useHelpTextQuery();
  if (!data) {
    return <LoadingView />;
  }
  return (
    <AppView>
      <ScrollingContentView
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        isStack={true}>
        <PaddedContentView>
          <ContentText text={data} forceMarkdown={true} />
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};
