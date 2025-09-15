import {AppIcons} from '@tricordarr/libraries/Enums/Icons';
import {Menu} from 'react-native-paper';
import * as React from 'react';
import {usePrivilege} from '@tricordarr/components/Context/Contexts/PrivilegeContext';
import {useStyles} from '@tricordarr/components/Context/Contexts/StyleContext';

export const PostAsModeratorMenuItem = ({closeMenu}: {closeMenu: () => void}) => {
  const {asModerator, setAsTwitarrTeam, setAsModerator, hasModerator} = usePrivilege();
  const {commonStyles} = useStyles();
  if (!hasModerator) {
    return null;
  }
  return (
    <Menu.Item
      title={'Post as Moderator'}
      dense={false}
      leadingIcon={AppIcons.moderator}
      onPress={() => {
        setAsTwitarrTeam(false);
        setAsModerator(!asModerator);
        closeMenu();
      }}
      style={asModerator ? commonStyles.surfaceVariant : undefined}
    />
  );
};
