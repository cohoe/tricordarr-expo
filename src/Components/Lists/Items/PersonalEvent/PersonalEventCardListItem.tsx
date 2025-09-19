import React, {Dispatch, memo, SetStateAction, useState} from 'react';
import {FezData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {ScheduleCardMarkerType} from '@tricordarr/Libraries/Types';
import {PersonalEventCardActionsMenu} from '@tricordarr/Components/Menus/PersonalEvents/PersonalEventCardActionsMenu.tsx';
import {FezCard} from '@tricordarr/Components/Cards/Schedule/FezCard.tsx';

interface PersonalEventCardListItemProps {
  eventData: FezData;
  onPress?: () => void;
  marker?: ScheduleCardMarkerType;
  setRefreshing?: Dispatch<SetStateAction<boolean>>;
}

const PersonalEventCardListItemInternal = (props: PersonalEventCardListItemProps) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const anchorContent = (
    <FezCard
      fez={props.eventData}
      onPress={props.onPress}
      marker={props.marker}
      onLongPress={() => setMenuVisible(true)}
    />
  );

  return (
    <PersonalEventCardActionsMenu
      eventData={props.eventData}
      setRefreshing={props.setRefreshing}
      menuVisible={menuVisible}
      setMenuVisible={setMenuVisible}
      anchor={anchorContent}
    />
  );
};

export const PersonalEventCardListItem = memo(PersonalEventCardListItemInternal);
