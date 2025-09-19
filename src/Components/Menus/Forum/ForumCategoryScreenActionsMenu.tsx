import {Menu} from 'react-native-paper';
import {AppIcons} from '@tricordarr/Libraries/Enums/Icons.ts';
import React, {useState} from 'react';
import {Item} from 'react-navigation-header-buttons';
import {CommonStackComponents, useCommonStack} from '@tricordarr/Components/Navigation/CommonScreens.tsx';
import {AppHeaderMenu} from '@tricordarr/Components/Menus/AppHeaderMenu.tsx';

export const ForumCategoryScreenActionsMenu = () => {
  const [visible, setVisible] = useState(false);
  const commonNavigation = useCommonStack();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <AppHeaderMenu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Item title={'Actions'} iconName={AppIcons.menu} onPress={openMenu} />}>
      <Menu.Item
        title={'Settings'}
        leadingIcon={AppIcons.settings}
        onPress={() => {
          closeMenu();
          commonNavigation.push(CommonStackComponents.forumSettingsScreen);
        }}
      />
      <Menu.Item
        title={'Help'}
        leadingIcon={AppIcons.help}
        onPress={() => {
          closeMenu();
          commonNavigation.push(CommonStackComponents.forumHelpScreen);
        }}
      />
    </AppHeaderMenu>
  );
};
