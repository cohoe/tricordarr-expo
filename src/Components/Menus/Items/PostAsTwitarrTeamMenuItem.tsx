import {AppIcons} from '@tricordarr/libraries/Enums/Icons';
import {Menu} from 'react-native-paper';
import * as React from 'react';
import {usePrivilege} from '@tricordarr/components/Context/Contexts/PrivilegeContext';
import {useStyles} from '@tricordarr/components/Context/Contexts/StyleContext';

export const PostAsTwitarrTeamMenuItem = ({closeMenu}: {closeMenu: () => void}) => {
  const {asTwitarrTeam, setAsTwitarrTeam, setAsModerator, hasTwitarrTeam} = usePrivilege();
  const {commonStyles} = useStyles();
  if (!hasTwitarrTeam) {
    return null;
  }
  return (
    <Menu.Item
      title={'Post as TwitarrTeam'}
      dense={false}
      leadingIcon={AppIcons.twitarteam}
      onPress={() => {
        setAsModerator(false);
        setAsTwitarrTeam(!asTwitarrTeam);
        closeMenu();
      }}
      style={asTwitarrTeam ? commonStyles.surfaceVariant : undefined}
    />
  );
};
