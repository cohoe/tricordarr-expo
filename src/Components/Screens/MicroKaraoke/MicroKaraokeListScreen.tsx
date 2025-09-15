import { AppView } from '@tricordarr/components/Views/AppView';
import { ScrollingContentView } from '@tricordarr/components/Views/Content/ScrollingContentView';
import React from 'react';
import { RefreshControl } from 'react-native';
import { useMicroKaraokeSonglistQuery } from '@tricordarr/components/Queries/MicroKaraoke/MicroKaraokeQueries';
import { LoadingView } from '@tricordarr/components/Views/Static/LoadingView';
import { MicroKaraokeSongListItem } from '@tricordarr/components/Lists/Items/MicroKaraokeSongListItem';

export const MicroKaraokeListScreen = () => {
  const { data, refetch, isFetching } = useMicroKaraokeSonglistQuery();
  console.log(data);

  if (data === undefined) {
    return <LoadingView />;
  }

  return (
    <AppView>
      <ScrollingContentView
        isStack={true}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}>
        {data.map(mkSong => {
          return <MicroKaraokeSongListItem mkSong={mkSong} key={mkSong.songID} />;
        })}
      </ScrollingContentView>
    </AppView>
  );
};
