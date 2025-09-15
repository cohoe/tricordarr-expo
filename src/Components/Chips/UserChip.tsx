import React from 'react';
import {Chip} from 'react-native-paper';
import {UserAvatarImage} from '@tricordarr/components/Images/UserAvatarImage';
import {useStyles} from '@tricordarr/components/Context/Contexts/StyleContext';
import {UserHeader} from '@tricordarr/libraries/Structs/ControllerStructs';

type UserChipProps = {
  onClose?: () => void;
  disabled?: boolean;
  userHeader: UserHeader;
  onPress?: () => void;
};

export const UserChip = ({userHeader, onClose, disabled, onPress}: UserChipProps) => {
  const {commonStyles} = useStyles();
  const styles = [commonStyles.marginRightSmall, commonStyles.marginBottomSmall];

  const getAvatar = () => <UserAvatarImage userHeader={userHeader} />;

  return (
    <Chip style={styles} icon={getAvatar} disabled={disabled} onClose={onClose} onPress={onPress}>
      {userHeader.username}
    </Chip>
  );
};
