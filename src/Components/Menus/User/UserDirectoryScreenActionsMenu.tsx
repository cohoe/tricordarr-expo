import React from 'react';
import {Divider, Menu} from 'react-native-paper';
import {Item} from 'react-navigation-header-buttons';
import {AppIcons} from '@tricordarr/Libraries/Enums/Icons';
import {CommonStackComponents, useCommonStack} from '@tricordarr/Components/Navigation/CommonScreens';
import {AppHeaderMenu} from '@tricordarr/Components/Menus/AppHeaderMenu';

export const UserDirectoryScreenActionsMenu = () => {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const commonNavigation = useCommonStack();
  const handleNavigation = (screen: CommonStackComponents) => {
    closeMenu();
    commonNavigation.push(screen);
  };

  return (
    <AppHeaderMenu
      visible={visible}
      anchor={<Item title={'Actions'} iconName={AppIcons.menu} onPress={openMenu} />}
      onDismiss={closeMenu}>
      <Menu.Item
        title={'Favorites'}
        leadingIcon={AppIcons.favorite}
        onPress={() => handleNavigation(CommonStackComponents.favoriteUsers)}
      />
      <Menu.Item
        title={'Mutes'}
        leadingIcon={AppIcons.mute}
        onPress={() => handleNavigation(CommonStackComponents.muteUsers)}
      />
      <Menu.Item
        title={'Blocks'}
        leadingIcon={AppIcons.block}
        onPress={() => handleNavigation(CommonStackComponents.blockUsers)}
      />
      <Divider bold={true} />
      <Menu.Item
        title={'Help'}
        leadingIcon={AppIcons.help}
        onPress={() => handleNavigation(CommonStackComponents.userDirectoryHelpScreen)}
      />
    </AppHeaderMenu>
  );
};
