import { EventData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { useState } from 'react';
import { Menu } from 'react-native-paper';
import { Item } from 'react-navigation-header-buttons';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import React from 'react';
import { EventDownloadMenuItem } from '@tricordarr/components/Menus/Events/Items/EventDownloadMenuItem';
import { CommonStackComponents, useCommonStack } from '@tricordarr/components/Navigation/CommonScreens';
import { EventType } from '@tricordarr/libraries/Enums/EventType';
import { useConfig } from '@tricordarr/components/Context/Contexts/ConfigContext';
import { AppHeaderMenu } from '@tricordarr/components/Menus/AppHeaderMenu';

interface EventScreenActionsMenuProps {
  event: EventData;
}

export const EventScreenActionsMenu = (props: EventScreenActionsMenuProps) => {
  const [visible, setVisible] = useState(false);
  const commonNavigation = useCommonStack();
  const { preRegistrationAvailable } = useConfig();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleHelp = () => {
    closeMenu();
    commonNavigation.push(CommonStackComponents.scheduleHelpScreen);
  };

  return (
    <AppHeaderMenu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Item title={'Actions'} iconName={AppIcons.menu} onPress={openMenu} />}>
      <EventDownloadMenuItem closeMenu={closeMenu} event={props.event} />
      {props.event.eventType === EventType.shadow && (
        <Menu.Item
          title={'Set Organizer'}
          leadingIcon={AppIcons.performer}
          onPress={() => {
            closeMenu();
            commonNavigation.push(CommonStackComponents.eventAddPerformerScreen, {
              eventID: props.event.eventID,
            });
          }}
          disabled={!preRegistrationAvailable}
        />
      )}
      <Menu.Item title={'Help'} leadingIcon={AppIcons.help} onPress={handleHelp} />
    </AppHeaderMenu>
  );
};
