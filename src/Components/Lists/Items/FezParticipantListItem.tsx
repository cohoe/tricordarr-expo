import React from 'react';
import {AppIcons} from '../../../libraries/Enums/Icons';
import {FezData, UserHeader} from '../../../libraries/Structs/ControllerStructs';
import {UserListItem} from './UserListItem';
import {useUserProfileQuery} from '../../Queries/User/UserQueries.ts';

interface FezParticipantListItemProps {
  user: UserHeader;
  fez: FezData;
  onRemove?: () => void;
  onPress?: () => void;
}

export const FezParticipantListItem = ({user, fez, onRemove, onPress}: FezParticipantListItemProps) => {
  let enableDelete = true;
  const {data: profilePublicData} = useUserProfileQuery();

  // Cannot delete participant if:
  // * They (or you) are the owner.
  // * You aren't the owner.
  // But can if you are you.
  if (user.userID === fez.owner.userID) {
    enableDelete = false;
  } else if (user.userID === profilePublicData?.header.userID && user.userID === fez.owner.userID) {
    enableDelete = false;
  } else if (
    profilePublicData?.header.userID !== fez.owner.userID &&
    profilePublicData?.header.userID !== user.userID
  ) {
    enableDelete = false;
  }

  return (
    <UserListItem
      userHeader={user}
      onPress={onPress}
      buttonIcon={AppIcons.delete}
      buttonOnPress={enableDelete ? onRemove : undefined}
    />
  );
};
