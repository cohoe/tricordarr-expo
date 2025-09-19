import React, {memo} from 'react';
import {FezData, FezPostData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {UserAvatarImage} from '@tricordarr/Components/Images/UserAvatarImage';
import {MessageView} from '@tricordarr/Components/Views/MessageView';
import {MessageViewContainer} from '@tricordarr/Components/Views/MessageViewContainer';
import {MessageSpacerView} from '@tricordarr/Components/Views/MessageSpacerView';
import {MessageAvatarContainerView} from '@tricordarr/Components/Views/MessageAvatarContainerView';
import {FlatListItemContent} from '@tricordarr/Components/Views/Content/FlatListItemContent';
import {usePrivilege} from '@tricordarr/Components/Context/Contexts/PrivilegeContext';
import {ContentPostImage} from '@tricordarr/Components/Images/ContentPostImage';
import {useChatStack} from '@tricordarr/Components/Navigation/Stacks/ChatStackNavigator';
import {CommonStackComponents} from '@tricordarr/Components/Navigation/CommonScreens';
import {useUserProfileQuery} from '@tricordarr/Queries/User/UserQueries';

// https://github.com/akveo/react-native-ui-kitten/issues/1167
interface FezPostListItemProps {
  fez: FezData;
  fezPost: FezPostData;
  index: number;
  separators: {
    highlight: () => void;
    unhighlight: () => void;
    updateProps: (select: 'leading' | 'trailing', newProps: any) => void;
  };
}

const FezPostListItemInternal = ({fezPost, fez}: FezPostListItemProps) => {
  const {data: profilePublicData} = useUserProfileQuery();
  const {asPrivilegedUser} = usePrivilege();
  const seamailNavigation = useChatStack();

  let showAuthor = fez.participantCount > 2;

  // Do not show the author for the users own messages.
  if (fezPost.author.userID === profilePublicData?.header.userID) {
    showAuthor = false;
  }

  // Always show the author of all messages in privileged conversations.
  if (asPrivilegedUser) {
    showAuthor = true;
  }

  const messageOnRight =
    fezPost.author.userID === profilePublicData?.header.userID || fezPost.author.username === asPrivilegedUser;

  const onPress = () => {
    seamailNavigation.push(CommonStackComponents.userProfileScreen, {
      userID: fezPost.author.userID,
    });
  };

  return (
    <FlatListItemContent>
      {!messageOnRight && (
        <MessageAvatarContainerView onPress={onPress}>
          <UserAvatarImage userHeader={fezPost.author} small={true} />
        </MessageAvatarContainerView>
      )}
      {messageOnRight && <MessageSpacerView />}
      <MessageViewContainer>
        <MessageView fez={fez} fezPost={fezPost} messageOnRight={messageOnRight} showAuthor={showAuthor} />
        {fezPost.image && <ContentPostImage image={fezPost.image} messageOnRight={messageOnRight} />}
      </MessageViewContainer>
      {!messageOnRight && <MessageSpacerView />}
    </FlatListItemContent>
  );
};

export const FezPostListItem = memo(FezPostListItemInternal);
