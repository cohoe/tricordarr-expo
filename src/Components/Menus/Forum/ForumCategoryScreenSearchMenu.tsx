import React from 'react';
import { CommonStackComponents } from '@tricordarr/components/Navigation/CommonScreens';
import { Menu } from 'react-native-paper';
import { Item } from 'react-navigation-header-buttons';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { ForumStackComponents, useForumStackNavigation } from '@tricordarr/components/Navigation/Stacks/ForumStackNavigator';
import { CategoryData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { AppHeaderMenu } from '@tricordarr/components/Menus/AppHeaderMenu';

interface ForumCategoryScreenSearchMenuProps {
  category: CategoryData;
}

export const ForumCategoryScreenSearchMenu = (props: ForumCategoryScreenSearchMenuProps) => {
  const [visible, setVisible] = React.useState(false);
  const forumNavigation = useForumStackNavigation();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <AppHeaderMenu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Item title={'Search'} iconName={AppIcons.search} onPress={openMenu} />}>
      <Menu.Item
        dense={false}
        title={'Search Posts'}
        leadingIcon={AppIcons.postSearch}
        onPress={() => {
          closeMenu();
          forumNavigation.push(CommonStackComponents.forumPostSearchScreen, {
            category: props.category,
          });
        }}
      />
      <Menu.Item
        dense={false}
        title={'Search Forums'}
        leadingIcon={AppIcons.search}
        onPress={() => {
          closeMenu();
          forumNavigation.push(ForumStackComponents.forumThreadSearchScreen, {
            category: props.category,
          });
        }}
      />
    </AppHeaderMenu>
  );
};
