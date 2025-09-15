import React from 'react';
import { AppView } from '@tricordarr/components/Views/AppView';
import { ScrollingContentView } from '@tricordarr/components/Views/Content/ScrollingContentView';
import { useConductQuery } from '@tricordarr/components/Queries/PublicQueries';
import { RefreshControl } from 'react-native';
import { LoadingView } from '@tricordarr/components/Views/Static/LoadingView';
import { ContentText } from '@tricordarr/components/Text/ContentText';
import { PaddedContentView } from '@tricordarr/components/Views/Content/PaddedContentView';

export const MainConductScreen = () => {
  const { data, refetch, isFetching } = useConductQuery();
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
