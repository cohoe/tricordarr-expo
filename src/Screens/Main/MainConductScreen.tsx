import React from 'react';
import {AppView} from '@tricordarr/Components/Views/AppView';
import {ScrollingContentView} from '@tricordarr/Components/Views/Content/ScrollingContentView';
import {useConductQuery} from '@tricordarr/Queries/PublicQueries';
import {RefreshControl} from 'react-native';
import {LoadingView} from '@tricordarr/Components/Views/Static/LoadingView';
import {ContentText} from '@tricordarr/Components/Text/ContentText.tsx';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView.tsx';

export const MainConductScreen = () => {
  const {data, refetch, isFetching} = useConductQuery();
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
