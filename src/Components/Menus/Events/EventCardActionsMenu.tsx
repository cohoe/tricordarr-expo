import React, { Dispatch, SetStateAction } from 'react';
import { Menu } from 'react-native-paper';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { EventData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { CommonStackComponents, useCommonStack } from '@tricordarr/components/Navigation/CommonScreens';
import { EventDownloadMenuItem } from '@tricordarr/components/Menus/Events/Items/EventDownloadMenuItem';
import { EventType } from '@tricordarr/libraries/Enums/EventType';

interface EventCardActionsMenuProps {
  anchor: React.JSX.Element;
  eventData: EventData;
  menuVisible: boolean;
  setMenuVisible: Dispatch<SetStateAction<boolean>>;
  setRefreshing?: Dispatch<SetStateAction<boolean>>;
}
export const EventCardActionsMenu = (props: EventCardActionsMenuProps) => {
  const commonNavigation = useCommonStack();

  const closeMenu = () => props.setMenuVisible(false);

  const handleForumPress = () => {
    closeMenu();
    if (props.eventData.forum) {
      commonNavigation.push(CommonStackComponents.forumThreadScreen, {
        forumID: props.eventData.forum,
      });
    }
  };

  return (
    <Menu visible={props.menuVisible} onDismiss={closeMenu} anchor={props.anchor}>
      {props.eventData.eventType === EventType.shadow && (
        <Menu.Item
          title={'Set Organizer'}
          leadingIcon={AppIcons.performer}
          onPress={() => {
            closeMenu();
            commonNavigation.push(CommonStackComponents.eventAddPerformerScreen, {
              eventID: props.eventData.eventID,
            });
          }}
        />
      )}
      {props.eventData.forum && <Menu.Item title={'Forum'} leadingIcon={AppIcons.forum} onPress={handleForumPress} />}
      <EventDownloadMenuItem closeMenu={closeMenu} event={props.eventData} />
    </Menu>
  );
};
