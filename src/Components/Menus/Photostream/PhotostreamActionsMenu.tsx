import { Item } from 'react-navigation-header-buttons';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import React from 'react';
import { Menu } from 'react-native-paper';
import { MainStackComponents, useMainStack } from '@tricordarr/components/Navigation/Stacks/MainStackNavigator';
import { CommonStackComponents } from '@tricordarr/components/Navigation/CommonScreens';
import { AppHeaderMenu } from '@tricordarr/components/Menus/AppHeaderMenu';

export const PhotostreamActionsMenu = () => {
  const [visible, setVisible] = React.useState(false);
  const navigation = useMainStack();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <AppHeaderMenu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Item title={'Actions'} iconName={AppIcons.menu} onPress={openMenu} />}>
      <Menu.Item
        title={'Image Settings'}
        onPress={() => {
          closeMenu();
          navigation.push(CommonStackComponents.imageSettingsScreen);
        }}
        leadingIcon={AppIcons.settings}
      />
      <Menu.Item
        title={'Help'}
        onPress={() => {
          closeMenu();
          navigation.push(MainStackComponents.photostreamHelpScreen);
        }}
        leadingIcon={AppIcons.help}
      />
    </AppHeaderMenu>
  );
};
