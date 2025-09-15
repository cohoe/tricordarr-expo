import * as React from 'react';
import { useState } from 'react';
import { Menu } from 'react-native-paper';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { Item } from 'react-navigation-header-buttons';
import { CommonStackComponents, useCommonStack } from '@tricordarr/components/Navigation/CommonScreens';
import { AppHeaderMenu } from '@tricordarr/components/Menus/AppHeaderMenu';

/**
 * Actions menu for when you're viewing your own profile.
 */
export const UserProfileSelfActionsMenu = () => {
  const [visible, setVisible] = useState(false);
  const commonNavigation = useCommonStack();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleHelp = () => {
    closeMenu();
    commonNavigation.push(CommonStackComponents.userProfileHelpScreen);
  };

  return (
    <AppHeaderMenu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Item title={'Actions'} iconName={AppIcons.menu} onPress={openMenu} />}>
      <Menu.Item leadingIcon={AppIcons.help} title={'Help'} onPress={handleHelp} />
    </AppHeaderMenu>
  );
};
