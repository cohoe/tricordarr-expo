import {EventCard} from '@tricordarr/Components/Cards/Schedule/EventCard';
import React, {Dispatch, memo, SetStateAction, useState} from 'react';
import {EventData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {ScheduleCardMarkerType} from '@tricordarr/Libraries/Types';
import {EventCardActionsMenu} from '@tricordarr/Components/Menus/Events/EventCardActionsMenu';

interface EventCardListItemProps {
  eventData: EventData;
  onPress?: () => void;
  marker?: ScheduleCardMarkerType;
  setRefreshing?: Dispatch<SetStateAction<boolean>>;
}

const EventCardListItemInternal = (props: EventCardListItemProps) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const anchorContent = (
    <EventCard
      eventData={props.eventData}
      onPress={props.onPress}
      marker={props.marker}
      onLongPress={() => setMenuVisible(true)}
    />
  );

  return (
    <EventCardActionsMenu
      eventData={props.eventData}
      setRefreshing={props.setRefreshing}
      menuVisible={menuVisible}
      setMenuVisible={setMenuVisible}
      anchor={anchorContent}
    />
  );
};

export const EventCardListItem = memo(EventCardListItemInternal);
