import { useTokenAuthQuery } from '@tricordarr/components/Queries/TokenAuthQuery';
import { MicroKaraokeCompletedSong, MicroKaraokeSongManifest } from '@tricordarr/libraries/Structs/ControllerStructs';

export const useMicroKaraokeSonglistQuery = () => {
  return useTokenAuthQuery<MicroKaraokeCompletedSong[]>('/microkaraoke/songlist');
};

export const useMicroKaraokeSongQuery = (songID: number, enabled = true) => {
  return useTokenAuthQuery<MicroKaraokeSongManifest>(`/microkaraoke/song/${songID}`, {
    enabled: enabled,
  });
};
