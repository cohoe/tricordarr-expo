import React, { Dispatch, memo, SetStateAction } from 'react';
import { Checkbox, List, Text } from 'react-native-paper';
import { commonStyles } from '@tricordarr/styles';
import { ForumListData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { StyleSheet, View } from 'react-native';
import pluralize from 'pluralize';
import { RelativeTimeTag } from '@tricordarr/components/Text/Tags/RelativeTimeTag';
import { useForumStackNavigation } from '@tricordarr/components/Navigation/Stacks/ForumStackNavigator';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { AppIcon } from '@tricordarr/components/Icons/AppIcon';
import { useAppTheme } from '@tricordarr/styles/Theme';
import { ForumNewBadge } from '@tricordarr/components/Badges/ForumNewBadge';
import { getEventTimeString } from '@tricordarr/libraries/DateTime';
import { UserBylineTag } from '@tricordarr/components/Text/Tags/UserBylineTag';
import { CommonStackComponents } from '@tricordarr/components/Navigation/CommonScreens';
import { ForumThreadListItemSwipeable } from '@tricordarr/components/Swipeables/ForumThreadListItemSwipeable';
import { useSelection } from '@tricordarr/components/Context/Contexts/SelectionContext';
import { ForumListDataSelectionActions } from '@tricordarr/components/Reducers/Forum/ForumListDataSelectionReducer';

interface ForumThreadListItemProps {
  forumListData: ForumListData;
  categoryID?: string;
  enableSelection: boolean;
  setEnableSelection: Dispatch<SetStateAction<boolean>>;
  selected: boolean;
}

const ForumThreadListInternal = ({
  forumListData,
  categoryID,
  // onSelect,
  enableSelection = false,
  selected = false,
  setEnableSelection,
}: ForumThreadListItemProps) => {
  const forumNavigation = useForumStackNavigation();
  const theme = useAppTheme();
  // const [selected, setSelected] = useState(false);
  const { dispatchSelectedForums } = useSelection();

  const styles = StyleSheet.create({
    item: {
      backgroundColor: theme.colors.background,
    },
    title: commonStyles.bold,
    rightContainer: {
      ...commonStyles.marginLeftSmall,
    },
    rightContent: {
      ...commonStyles.flexColumn,
      ...commonStyles.alignItemsEnd,
    },
    leftContainer: {
      ...commonStyles.flexColumn,
      ...commonStyles.justifyCenter,
    },
  });

  const getRight = () => {
    const unreadCount = forumListData.postCount - forumListData.readCount;
    if (
      unreadCount ||
      forumListData.isFavorite ||
      forumListData.isMuted ||
      forumListData.isLocked ||
      forumListData.isPinned
    ) {
      return (
        <View style={styles.rightContainer}>
          <View style={styles.rightContent}>
            {unreadCount !== 0 && !forumListData.isMuted && <ForumNewBadge unreadCount={unreadCount} unit={'post'} />}
            {forumListData.isFavorite && <AppIcon icon={AppIcons.favorite} color={theme.colors.twitarrYellow} />}
            {forumListData.isMuted && <AppIcon icon={AppIcons.mute} color={theme.colors.twitarrNegativeButton} />}
            {forumListData.isLocked && <AppIcon icon={AppIcons.locked} color={theme.colors.twitarrNegativeButton} />}
            {forumListData.isPinned && <AppIcon icon={AppIcons.pin} />}
          </View>
        </View>
      );
    }
  };

  const getDescription = () => (
    <View>
      {forumListData.eventTime && (
        <Text variant={'bodyMedium'}>{getEventTimeString(forumListData.eventTime, forumListData.timeZoneID)}</Text>
      )}
      <Text variant={'bodyMedium'}>
        {forumListData.postCount} {pluralize('post', forumListData.postCount)}
      </Text>
      <Text variant={'bodyMedium'}>
        Created <RelativeTimeTag variant={'bodyMedium'} date={new Date(forumListData.createdAt)} /> by{' '}
        <UserBylineTag user={forumListData.creator} includePronoun={false} variant={'bodyMedium'} />
      </Text>
      {forumListData.lastPostAt && (
        <Text variant={'bodyMedium'}>
          Last post <RelativeTimeTag variant={'bodyMedium'} date={new Date(forumListData.lastPostAt)} />
          {forumListData.lastPoster && (
            <UserBylineTag
              user={forumListData.lastPoster}
              includePronoun={false}
              variant={'bodyMedium'}
              prefix={' by'}
            />
          )}
        </Text>
      )}
    </View>
  );

  const onPress = () => {
    forumNavigation.push(CommonStackComponents.forumThreadScreen, {
      forumID: forumListData.forumID,
      forumListData: forumListData,
    });
  };

  const handleSelection = () => {
    dispatchSelectedForums({
      type: ForumListDataSelectionActions.select,
      forumListData: forumListData,
    });
    // setSelected(!selected);
  };

  const getLeft = () => {
    return (
      <View style={styles.leftContainer}>
        <Checkbox status={selected ? 'checked' : 'unchecked'} onPress={handleSelection} />
      </View>
    );
  };

  const onLongPress = () => {
    setEnableSelection(true);
    handleSelection();
  };

  return (
    <ForumThreadListItemSwipeable forumListData={forumListData} categoryID={categoryID} enabled={!enableSelection}>
      <List.Item
        style={styles.item}
        title={forumListData.title}
        titleStyle={styles.title}
        titleNumberOfLines={0}
        description={getDescription}
        onPress={enableSelection ? handleSelection : onPress}
        right={getRight}
        left={enableSelection ? getLeft : undefined}
        onLongPress={onLongPress}
      />
    </ForumThreadListItemSwipeable>
  );
};

export const ForumThreadListItem = memo(ForumThreadListInternal);
