import React from 'react';
import { Avatar } from 'react-native-paper';
import { styleDefaults } from '@tricordarr/styles';
import { UserAvatarImage } from '@tricordarr/components/Images/UserAvatarImage';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { FezData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { useUserProfileQuery } from '@tricordarr/components/Queries/User/UserQueries';

interface FezAvatarImageProps {
  fez: FezData;
}

export const FezAvatarImage = ({ fez }: FezAvatarImageProps) => {
  const { data: profilePublicData } = useUserProfileQuery();
  const otherParticipants = fez.members?.participants.filter(p => p.userID !== profilePublicData?.header.userID) || [];

  // More than 1 other person makes this a group chat.
  // 0 others is probably an error but to deal with it, we make it a chat with yourself.
  if (otherParticipants.length > 1) {
    return <Avatar.Icon size={styleDefaults.avatarSize} icon={AppIcons.group} />;
  } else if (otherParticipants.length === 0) {
    return <Avatar.Icon size={styleDefaults.avatarSize} icon={AppIcons.error} />;
  }

  return <UserAvatarImage userHeader={otherParticipants[0]} />;
};
