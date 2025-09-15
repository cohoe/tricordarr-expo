import React from 'react';
import {Card, List} from 'react-native-paper';
import {ListSection} from '@tricordarr/components/Lists/ListSection';
import {useStyles} from '@tricordarr/components/Context/Contexts/StyleContext';
import {ProfilePublicData} from '@tricordarr/libraries/Structs/ControllerStructs';
import {AppIcon} from '@tricordarr/components/Icons/AppIcon';
import {AppIcons} from '@tricordarr/libraries/Enums/Icons';
import {usePrivilege} from '@tricordarr/components/Context/Contexts/PrivilegeContext';
import {CommonStackComponents, useCommonStack} from '@tricordarr/components/Navigation/CommonScreens';

interface UserContentCardProps {
  user: ProfilePublicData;
}

/**
 * This used to have a button to your owned LFGs. But doing that with the common screens pattern
 * got super complicated and not worth it. Maybe some day.
 */
export const UserContentCard = ({user}: UserContentCardProps) => {
  const {commonStyles} = useStyles();
  const commonNavigation = useCommonStack();
  const {hasModerator} = usePrivilege();

  const getIcon = (icon: string) => <AppIcon style={[commonStyles.marginLeft]} icon={icon} />;

  return (
    <Card>
      <Card.Title title={`Content by @${user.header.username}`} />
      <Card.Content style={[commonStyles.paddingHorizontalZero]}>
        <ListSection>
          <List.Item
            title={'Forums'}
            left={() => getIcon(AppIcons.forum)}
            onPress={() => commonNavigation.push(CommonStackComponents.forumThreadUserScreen, {user: user.header})}
          />
          {hasModerator && (
            <List.Item
              title={'Forum Posts'}
              left={() => getIcon(AppIcons.moderator)}
              onPress={() => commonNavigation.push(CommonStackComponents.forumPostUserScreen, {user: user.header})}
            />
          )}
        </ListSection>
      </Card.Content>
    </Card>
  );
};
