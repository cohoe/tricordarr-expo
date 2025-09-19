import {AppView} from '@tricordarr/Components/Views/AppView';
import {ScrollingContentView} from '@tricordarr/Components/Views/Content/ScrollingContentView';
import React from 'react';
import {RefreshControl} from 'react-native';
import {useMicroKaraokeSonglistQuery} from '@tricordarr/Queries/MicroKaraoke/MicroKaraokeQueries';
import {LoadingView} from '@tricordarr/Components/Views/Static/LoadingView';
import {MicroKaraokeSongListItem} from '@tricordarr/Components/Lists/Items/MicroKaraokeSongListItem';

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
