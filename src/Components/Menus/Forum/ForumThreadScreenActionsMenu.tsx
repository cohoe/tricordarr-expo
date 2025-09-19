import React from 'react';
import {Divider, Menu} from 'react-native-paper';
import {AppIcons} from '@tricordarr/Libraries/Enums/Icons';
import {useModal} from '@tricordarr/Components/Context/Contexts/ModalContext';
import {ForumData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {usePrivilege} from '@tricordarr/Components/Context/Contexts/PrivilegeContext';
import {Item} from 'react-navigation-header-buttons';
import {ReportModalView} from '@tricordarr/Components/Views/Modals/ReportModalView';
import {ReactNode, useCallback, useState} from 'react';
import {PostAsModeratorMenuItem} from '@tricordarr/Components/Menus/Items/PostAsModeratorMenuItem';
import {PostAsTwitarrTeamMenuItem} from '@tricordarr/Components/Menus/Items/PostAsTwitarrTeamMenuItem';
import {CommonStackComponents, useCommonStack} from '@tricordarr/Components/Navigation/CommonScreens';
import {FavoriteMenuItem} from '@tricordarr/Components/Menus/Items/FavoriteMenuItem';
import {MuteMenuItem} from '@tricordarr/Components/Menus/Items/MuteMenuItem';
import {QueryKey, useQueryClient} from '@tanstack/react-query';
import {ModerateMenuItem} from '@tricordarr/Components/Menus/Items/ModerateMenuItem';
import {ReloadMenuItem} from '@tricordarr/Components/Menus/Items/ReloadMenuItem';
import {useForumRelationMutation} from '@tricordarr/Queries/Forum/ForumThreadRelationMutations.ts';
import {ForumThreadPinItem} from '@tricordarr/Components/Menus/Forum/Items/ForumThreadPinItem';
import {AppHeaderMenu} from '@tricordarr/Components/Menus/AppHeaderMenu.tsx';
import {useUserProfileQuery} from '@tricordarr/Queries/User/UserQueries.ts';

interface ForumThreadActionsMenuProps {
  forumData: ForumData;
  invalidationQueryKeys: QueryKey[];
  onRefresh: () => void;
}

export const ForumThreadScreenActionsMenu = ({
  forumData,
  invalidationQueryKeys,
  onRefresh,
}: ForumThreadActionsMenuProps) => {
  const [visible, setVisible] = React.useState(false);
  const {setModalContent, setModalVisible} = useModal();
  const {hasModerator, hasTwitarrTeam} = usePrivilege();
  const {data: profilePublicData} = useUserProfileQuery();
  const commonNavigation = useCommonStack();
  const relationMutation = useForumRelationMutation();
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleModal = (content: ReactNode) => {
    closeMenu();
    setModalContent(content);
    setModalVisible(true);
  };

  const handleFavorite = useCallback(() => {
    if (forumData) {
      setRefreshing(true);
      relationMutation.mutate(
        {
          forumID: forumData.forumID,
          relationType: 'favorite',
          action: forumData.isFavorite ? 'delete' : 'create',
        },
        {
          onSuccess: async () => {
            const invalidations = invalidationQueryKeys.map(key => {
              return queryClient.invalidateQueries(key);
            });
            await Promise.all(invalidations);
          },
          onSettled: () => {
            setRefreshing(false);
            closeMenu();
          },
        },
      );
    }
  }, [forumData, invalidationQueryKeys, queryClient, relationMutation]);

  const handleMute = useCallback(() => {
    if (forumData) {
      setRefreshing(true);
      relationMutation.mutate(
        {
          forumID: forumData.forumID,
          relationType: 'mute',
          action: forumData.isMuted ? 'delete' : 'create',
        },
        {
          onSuccess: async () => {
            const invalidations = invalidationQueryKeys.map(key => {
              return queryClient.invalidateQueries(key);
            });
            await Promise.all(invalidations);
          },
          onSettled: () => {
            setRefreshing(false);
            closeMenu();
          },
        },
      );
    }
  }, [forumData, invalidationQueryKeys, queryClient, relationMutation]);

  const handleHelp = () => {
    closeMenu();
    commonNavigation.push(CommonStackComponents.forumHelpScreen);
  };

  return (
    <AppHeaderMenu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Item title={'Actions'} iconName={AppIcons.menu} onPress={openMenu} />}>
      <ReloadMenuItem closeMenu={closeMenu} onReload={onRefresh} />
      <FavoriteMenuItem
        onPress={handleFavorite}
        disabled={forumData.isMuted}
        isFavorite={forumData.isFavorite}
        refreshing={refreshing}
      />
      {forumData.creator.userID !== profilePublicData?.header.userID && (
        <MuteMenuItem
          onPress={handleMute}
          disabled={forumData.isFavorite}
          isMuted={forumData.isMuted}
          refreshing={refreshing}
        />
      )}
      {forumData.creator.userID === profilePublicData?.header.userID && (
        <>
          <Menu.Item
            dense={false}
            title={'Edit'}
            leadingIcon={AppIcons.edit}
            onPress={() => {
              closeMenu();
              commonNavigation.push(CommonStackComponents.forumThreadEditScreen, {
                forumData: forumData,
              });
            }}
          />
          <Divider bold={true} />
        </>
      )}
      {forumData?.creator.username !== profilePublicData?.header.username && (
        <>
          <Menu.Item
            dense={false}
            leadingIcon={AppIcons.report}
            title={'Report'}
            onPress={() => handleModal(<ReportModalView forum={forumData} />)}
          />
          <Divider bold={true} />
        </>
      )}
      {hasTwitarrTeam && (
        <>
          <PostAsTwitarrTeamMenuItem closeMenu={closeMenu} />
          <Divider bold={true} />
        </>
      )}
      {hasModerator && (
        <>
          <PostAsModeratorMenuItem closeMenu={closeMenu} />
          <ModerateMenuItem
            closeMenu={closeMenu}
            resourceID={forumData.forumID}
            resource={'forum'}
            navigation={commonNavigation}
          />
          <ForumThreadPinItem
            isPinned={forumData.isPinned}
            refreshing={refreshing}
            categoryID={forumData.categoryID}
            forumID={forumData.forumID}
            closeMenu={closeMenu}
            setRefreshing={setRefreshing}
            invalidationQueryKeys={invalidationQueryKeys}
          />
          <Divider bold={true} />
        </>
      )}
      <Menu.Item onPress={handleHelp} title={'Help'} leadingIcon={AppIcons.help} />
    </AppHeaderMenu>
  );
};
