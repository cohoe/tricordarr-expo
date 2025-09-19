import React from 'react';
import {AppView} from '@tricordarr/Components/Views/AppView';
import {ScrollingContentView} from '@tricordarr/Components/Views/Content/ScrollingContentView';
import {useFaqQuery} from '@tricordarr/Queries/PublicQueries';
import {RefreshControl} from 'react-native';
import {LoadingView} from '@tricordarr/Components/Views/Static/LoadingView';
import {ContentText} from '@tricordarr/Components/Text/ContentText';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView';

export const FaqScreen = () => {
  const {data, refetch, isFetching} = useFaqQuery();
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
