import React, { ReactNode } from 'react';
import { ForumData, PostData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { Divider, Menu } from 'react-native-paper';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import Clipboard from '@react-native-clipboard/clipboard';
import { ForumPostActionsFavoriteItem } from '@tricordarr/components/Menus/Forum/Items/ForumPostActionsFavoriteItem';
import { ForumPostActionsReactionItem } from '@tricordarr/components/Menus/Forum/Items/ForumPostActionsReactionItem';
import { ForumPostActionsReportItem } from '@tricordarr/components/Menus/Forum/Items/ForumPostActionsReportItem';
import { ForumPostActionsModerateItem } from '@tricordarr/components/Menus/Forum/Items/ForumPostActionsModerateItem';
import { ForumPostActionsDeleteItem } from '@tricordarr/components/Menus/Forum/Items/ForumPostActionsDeleteItem';
import { ForumPostActionsShowThreadItem } from '@tricordarr/components/Menus/Forum/Items/ForumPostActionsShowThreadItem';
import { ForumPostActionsPinItem } from '@tricordarr/components/Menus/Forum/Items/ForumPostActionsPinItem';
import { CommonStackComponents, useCommonStack } from '@tricordarr/components/Navigation/CommonScreens';
import { useUserProfileQuery } from '@tricordarr/components/Queries/User/UserQueries';

interface ForumPostActionsMenuProps {
  visible: boolean;
  closeMenu: () => void;
  anchor: ReactNode;
  forumPost: PostData;
  enableShowInThread?: boolean;
  enablePinnedPosts?: boolean;
  forumData?: ForumData;
}

export const ForumPostActionsMenu = ({
  visible,
  closeMenu,
  anchor,
  forumPost,
  enableShowInThread,
  enablePinnedPosts,
  forumData,
}: ForumPostActionsMenuProps) => {
  const { data: profilePublicData } = useUserProfileQuery();
  const bySelf = profilePublicData?.header.userID === forumPost.author.userID;
  // Apparently this doesn't get to be available in the sub items? That's annoying.
  const commonNavigation = useCommonStack();

  return (
    <Menu visible={visible} onDismiss={closeMenu} anchor={anchor}>
      {enableShowInThread && (
        <>
          <ForumPostActionsShowThreadItem forumPost={forumPost} closeMenu={closeMenu} navigation={commonNavigation} />
          <Divider bold={true} />
        </>
      )}
      <Menu.Item
        dense={false}
        leadingIcon={AppIcons.copy}
        title={'Copy'}
        onPress={() => {
          Clipboard.setString(forumPost.text);
          closeMenu();
        }}
      />
      <Divider bold={true} />
      {bySelf && (
        <>
          <Menu.Item
            dense={false}
            leadingIcon={AppIcons.edit}
            title={'Edit'}
            onPress={() => {
              closeMenu();
              commonNavigation.push(CommonStackComponents.forumPostEditScreen, {
                postData: forumPost,
                forumData: forumData,
              });
            }}
          />
          <Divider bold={true} />
        </>
      )}
      <ForumPostActionsDeleteItem forumPost={forumPost} forumData={forumData} closeMenu={closeMenu} />
      <Divider bold={true} />
      <ForumPostActionsFavoriteItem forumPost={forumPost} forumData={forumData} />
      {enablePinnedPosts && (
        <>
          <ForumPostActionsPinItem forumPost={forumPost} forumData={forumData} />
          <Divider bold={true} />
        </>
      )}
      <Divider bold={true} />
      <ForumPostActionsReportItem forumPost={forumPost} closeMenu={closeMenu} />
      <Divider bold={true} />
      <ForumPostActionsModerateItem forumPost={forumPost} closeMenu={closeMenu} navigation={commonNavigation} />
      <Divider bold={true} />
      <ForumPostActionsReactionItem forumPost={forumPost} />
    </Menu>
  );
};
