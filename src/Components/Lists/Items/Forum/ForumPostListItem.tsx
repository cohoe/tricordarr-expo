import React, {memo} from 'react';
import {ForumData, PostData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {UserAvatarImage} from '@tricordarr/Components/Images/UserAvatarImage';
import {MessageViewContainer} from '@tricordarr/Components/Views/MessageViewContainer';
import {MessageAvatarContainerView} from '@tricordarr/Components/Views/MessageAvatarContainerView';
import {FlatListItemContent} from '@tricordarr/Components/Views/Content/FlatListItemContent';
import {ContentPostImage} from '@tricordarr/Components/Images/ContentPostImage';
import {ForumPostMessageView} from '@tricordarr/Components/Views/Forum/ForumPostMessageView';
import {useForumStackNavigation} from '@tricordarr/Components/Navigation/Stacks/ForumStackNavigator';
import {CommonStackComponents} from '@tricordarr/Components/Navigation/CommonScreens';

// https://github.com/akveo/react-native-ui-kitten/issues/1167
interface ForumPostListItemProps {
  postData: PostData;
  index?: number;
  separators?: {
    highlight: () => void;
    unhighlight: () => void;
    updateProps: (select: 'leading' | 'trailing', newProps: any) => void;
  };
  enableShowInThread?: boolean;
  enablePinnedPosts?: boolean;
  forumData?: ForumData;
}

const ForumPostListItemInternal = ({
  postData,
  enableShowInThread,
  enablePinnedPosts,
  forumData,
}: ForumPostListItemProps) => {
  const forumNavigation = useForumStackNavigation();

  const handleAuthorAvatarPress = () => {
    forumNavigation.push(CommonStackComponents.userProfileScreen, {
      userID: postData.author.userID,
    });
  };

  return (
    <FlatListItemContent>
      <MessageAvatarContainerView onPress={handleAuthorAvatarPress}>
        <UserAvatarImage userHeader={postData.author} small={true} />
      </MessageAvatarContainerView>
      <MessageViewContainer>
        <ForumPostMessageView
          postData={postData}
          showAuthor={true}
          enableShowInThread={enableShowInThread}
          enablePinnedPosts={enablePinnedPosts}
          forumData={forumData}
        />
        {postData.images &&
          postData.images.map((image, index) => {
            return <ContentPostImage key={index} image={image} messageOnRight={false} />;
          })}
      </MessageViewContainer>
    </FlatListItemContent>
  );
};

// https://react.dev/reference/react/memo
export const ForumPostListItem = memo(ForumPostListItemInternal);
