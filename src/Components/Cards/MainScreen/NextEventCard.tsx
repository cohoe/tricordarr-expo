import React from 'react';
import {View} from 'react-native';
import {EventCard} from '@tricordarr/Components/Cards/Schedule/EventCard';
import {useEventQuery} from '@tricordarr/Queries/Events/EventQueries';
import {CommonStackComponents, useCommonStack} from '@tricordarr/Components/Navigation/CommonScreens';

export const NextEventCard = ({eventID}: {eventID: string}) => {
  const {data} = useEventQuery({eventID: eventID});
  const commonNavigation = useCommonStack();

  return (
    <View>
      {data && (
        <EventCard
          eventData={data}
          hideFavorite={true}
          showDay={true}
          onPress={() => commonNavigation.push(CommonStackComponents.eventScreen, {eventID: eventID})}
          titleHeader={'Your next event:'}
        />
      )}
    </View>
  );
};
