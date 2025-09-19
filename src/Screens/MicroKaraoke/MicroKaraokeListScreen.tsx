import {AppView} from '@tricordarr/../Views/AppView.tsx';
import {ScrollingContentView} from '@tricordarr/../Views/Content/ScrollingContentView.tsx';
import React from 'react';
import {RefreshControl} from 'react-native';
import {useMicroKaraokeSonglistQuery} from '@tricordarr/../Queries/MicroKaraoke/MicroKaraokeQueries.ts';
import {LoadingView} from '@tricordarr/../Views/Static/LoadingView.tsx';
import {MicroKaraokeSongListItem} from '@tricordarr/../Lists/Items/MicroKaraokeSongListItem.tsx';

export const MicroKaraokeListScreen = () => {
  const {data, refetch, isFetching} = useMicroKaraokeSonglistQuery();
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
