import * as React from 'react';
import { ReactNode, useState } from 'react';
import { Divider, Menu } from 'react-native-paper';
import { ProfilePublicData, UserHeader } from '@tricordarr/libraries/Structs/ControllerStructs';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { ReportModalView } from '@tricordarr/components/Views/Modals/ReportModalView';
import { useModal } from '@tricordarr/components/Context/Contexts/ModalContext';
import { MuteUserModalView } from '@tricordarr/components/Views/Modals/MuteUserModalView';
import { BlockUserModalView } from '@tricordarr/components/Views/Modals/BlockUserModalView';
import { usePrivilege } from '@tricordarr/components/Context/Contexts/PrivilegeContext';
import { Item } from 'react-navigation-header-buttons';
import { CommonStackComponents, useCommonStack } from '@tricordarr/components/Navigation/CommonScreens';
import { useUserBlockMutation } from '@tricordarr/components/Queries/Users/UserBlockMutations';
import { useUserMuteMutation } from '@tricordarr/components/Queries/Users/UserMuteMutations';
import { AppHeaderMenu } from '@tricordarr/components/Menus/AppHeaderMenu';
import { useQueryClient } from '@tanstack/react-query';

interface UserProfileActionsMenuProps {
  profile: ProfilePublicData;
  isMuted: boolean;
  isBlocked: boolean;
  oobe?: boolean;
}

export const UserProfileScreenActionsMenu = ({ profile, isMuted, isBlocked, oobe }: UserProfileActionsMenuProps) => {
  const [visible, setVisible] = useState(false);
  const { setModalContent, setModalVisible } = useModal();
  const muteMutation = useUserMuteMutation();
  const blockMutation = useUserBlockMutation();
  const { hasTwitarrTeam, hasModerator } = usePrivilege();
  const commonNavigation = useCommonStack();
  const queryClient = useQueryClient();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleModerate = () => {
    closeMenu();
    commonNavigation.push(CommonStackComponents.siteUIScreen, {
      resource: 'userprofile',
      id: profile.header.userID,
      moderate: true,
    });
  };
  const handleModal = (content: ReactNode) => {
    closeMenu();
    setModalContent(content);
    setModalVisible(true);
  };
  const handleRegCode = () => {
    closeMenu();
    commonNavigation.push(CommonStackComponents.userRegCodeScreen, {
      userID: profile.header.userID,
    });
  };
  const handleNote = () => {
    closeMenu();
    commonNavigation.push(CommonStackComponents.userPrivateNoteScreen, {
      user: profile,
    });
  };
  const handleHelp = () => {
    closeMenu();
    commonNavigation.push(CommonStackComponents.userProfileHelpScreen, {
      oobe: oobe,
    });
  };

  return (
    <AppHeaderMenu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Item title={'Actions'} iconName={AppIcons.menu} onPress={openMenu} />}>
      <Menu.Item leadingIcon={AppIcons.privateNoteEdit} title={'Private Note'} onPress={handleNote} />
      <Divider bold={true} />
      <Menu.Item
        leadingIcon={isBlocked ? AppIcons.unblock : AppIcons.block}
        title={isBlocked ? 'Unblock' : 'Block'}
        onPress={() => {
          if (isBlocked) {
            blockMutation.mutate(
              { userID: profile.header.userID, action: 'unblock' },
              {
                onSuccess: () => {
                  const invalidations = UserHeader.getRelationKeys().map(key => {
                    return queryClient.invalidateQueries(key);
                  });
                  Promise.all(invalidations);
                  closeMenu();
                },
              },
            );
          } else {
            handleModal(<BlockUserModalView user={profile.header} />);
          }
        }}
      />
      <Menu.Item
        leadingIcon={isMuted ? AppIcons.unmute : AppIcons.mute}
        title={isMuted ? 'Unmute' : 'Mute'}
        onPress={() => {
          if (isMuted) {
            muteMutation.mutate(
              { userID: profile.header.userID, action: 'unmute' },
              {
                onSuccess: () => {
                  const invalidations = UserHeader.getRelationKeys().map(key => {
                    return queryClient.invalidateQueries(key);
                  });
                  Promise.all(invalidations);
                  closeMenu();
                },
              },
            );
          } else {
            handleModal(<MuteUserModalView user={profile.header} />);
          }
        }}
      />
      <Menu.Item
        leadingIcon={AppIcons.report}
        title={'Report'}
        onPress={() => handleModal(<ReportModalView profile={profile} />)}
      />
      {(hasModerator || hasTwitarrTeam) && (
        <>
          <Divider bold={true} />
          {hasModerator && <Menu.Item leadingIcon={AppIcons.moderator} title={'Moderate'} onPress={handleModerate} />}
          {hasTwitarrTeam && (
            <Menu.Item leadingIcon={AppIcons.twitarteam} title={'Registration'} onPress={handleRegCode} />
          )}
        </>
      )}
      <Divider bold={true} />
      <Menu.Item leadingIcon={AppIcons.help} title={'Help'} onPress={handleHelp} />
    </AppHeaderMenu>
  );
};
