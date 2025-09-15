import React, { useState } from 'react';
import { Menu } from 'react-native-paper';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { ForumFilter } from '@tricordarr/libraries/Enums/ForumSortFilter';
import { useFilter } from '@tricordarr/components/Context/Contexts/FilterContext';
import { SelectableMenuItem } from '@tricordarr/components/Menus/Items/SelectableMenuItem';
import { MenuAnchor } from '@tricordarr/components/Menus/MenuAnchor';
import { AppHeaderMenu } from '@tricordarr/components/Menus/AppHeaderMenu';

export const ForumThreadScreenFilterMenu = () => {
  const [visible, setVisible] = useState(false);
  const { forumFilter, setForumFilter } = useFilter();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const menuAnchor = (
    <MenuAnchor
      title={'Filter'}
      active={!!forumFilter}
      iconName={AppIcons.filter}
      onPress={openMenu}
      onLongPress={() => setForumFilter(undefined)}
    />
  );

  const handleFilterSelection = (filter: ForumFilter) => {
    if (filter === forumFilter) {
      setForumFilter(undefined);
    } else {
      setForumFilter(filter);
    }
    closeMenu();
  };

  return (
    <AppHeaderMenu visible={visible} onDismiss={closeMenu} anchor={menuAnchor}>
      <SelectableMenuItem
        title={'Favorites'}
        leadingIcon={AppIcons.favorite}
        selected={forumFilter === ForumFilter.favorite}
        onPress={() => handleFilterSelection(ForumFilter.favorite)}
      />
      <SelectableMenuItem
        title={'Your Forums'}
        leadingIcon={AppIcons.user}
        selected={forumFilter === ForumFilter.owned}
        onPress={() => handleFilterSelection(ForumFilter.owned)}
      />
      <SelectableMenuItem
        title={'Muted'}
        leadingIcon={AppIcons.mute}
        selected={forumFilter === ForumFilter.mute}
        onPress={() => handleFilterSelection(ForumFilter.mute)}
      />
      <SelectableMenuItem
        title={'Unread'}
        leadingIcon={AppIcons.forumUnread}
        selected={forumFilter === ForumFilter.unread}
        onPress={() => handleFilterSelection(ForumFilter.unread)}
      />
    </AppHeaderMenu>
  );
};
