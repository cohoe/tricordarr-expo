import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useAnnouncementsQuery } from '@tricordarr/components/Queries/Alert/AnnouncementQueries';
import { AnnouncementData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { AnnouncementCard } from '@tricordarr/components/Cards/MainScreen/AnnouncementCard';
import { PaddedContentView } from '@tricordarr/components/Views/Content/PaddedContentView';

/**
 * A card to display an announcement from the API.
 */
export const TodayAnnouncementView = () => {
  const { data } = useAnnouncementsQuery();
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>([]);

  useEffect(() => {
    if (data) {
      setAnnouncements(data);
    }
  }, [data]);

  return (
    <View>
      {announcements.map(a => (
        <PaddedContentView key={a.id}>
          <AnnouncementCard announcement={a} />
        </PaddedContentView>
      ))}
    </View>
  );
};
