import { Item } from 'react-navigation-header-buttons';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { Menu } from 'react-native-paper';
import * as React from 'react';
import { ChatStackScreenComponents, useChatStack } from '@tricordarr/components/Navigation/Stacks/ChatStackNavigator';
import { CommonStackComponents } from '@tricordarr/components/Navigation/CommonScreens';
import { AppHeaderMenu } from '@tricordarr/components/Menus/AppHeaderMenu';

export const SeamailListScreenActionsMenu = () => {
  const [visible, setVisible] = React.useState(false);
  const navigation = useChatStack();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <AppHeaderMenu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Item title={'Actions'} iconName={AppIcons.menu} onPress={openMenu} />}>
      <Menu.Item
        leadingIcon={AppIcons.settings}
        title={'Settings'}
        onPress={() => {
          closeMenu();
          navigation.push(ChatStackScreenComponents.seamailSettingsScreen);
        }}
      />
      <Menu.Item
        leadingIcon={AppIcons.help}
        title={'Help'}
        onPress={() => {
          closeMenu();
          navigation.push(CommonStackComponents.seamailHelpScreen);
        }}
      />
    </AppHeaderMenu>
  );
};
