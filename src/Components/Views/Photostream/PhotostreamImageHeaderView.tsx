import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { UserAvatarImage } from '@tricordarr/components/Images/UserAvatarImage';
import { UserBylineTag } from '@tricordarr/components/Text/Tags/UserBylineTag';
import { PhotostreamImageData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { useStyles } from '@tricordarr/components/Context/Contexts/StyleContext';
import { IconButton } from 'react-native-paper';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { PhotostreamImageActionsMenu } from '@tricordarr/components/Menus/Photostream/PhotostreamImageActionsMenu';
import { RelativeTimeTag } from '@tricordarr/components/Text/Tags/RelativeTimeTag';
import { CommonStackComponents, useCommonStack } from '@tricordarr/components/Navigation/CommonScreens';

interface PhotostreamAuthorViewProps {
  image: PhotostreamImageData;
}

export const PhotostreamImageHeaderView = (props: PhotostreamAuthorViewProps) => {
  const { commonStyles } = useStyles();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const commonNavigation = useCommonStack();

  const styles = StyleSheet.create({
    viewContainer: {
      ...commonStyles.flexRow,
      ...commonStyles.paddingVerticalSmall,
      ...commonStyles.paddingHorizontalSmall,
      ...commonStyles.alignItemsCenter,
    },
    avatarContainer: {
      ...commonStyles.marginRightSmall,
    },
    rowContainer: {
      ...commonStyles.flex,
    },
    menuIconButton: {
      ...commonStyles.marginZero,
    },
  });

  const onHeaderPress = () =>
    commonNavigation.push(CommonStackComponents.userProfileScreen, {
      userID: props.image.author.userID,
    });

  return (
    <View style={styles.viewContainer}>
      <TouchableOpacity style={styles.avatarContainer} onPress={onHeaderPress}>
        <UserAvatarImage userHeader={props.image.author} />
      </TouchableOpacity>
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={onHeaderPress}>
          <UserBylineTag user={props.image.author} style={commonStyles.bold} />
        </TouchableOpacity>
        <RelativeTimeTag date={new Date(props.image.createdAt)} variant={'labelMedium'} />
      </View>
      <View>
        <PhotostreamImageActionsMenu
          anchor={<IconButton icon={AppIcons.menu} style={styles.menuIconButton} onPress={openMenu} />}
          image={props.image}
          closeMenu={closeMenu}
          visible={menuVisible}
        />
      </View>
    </View>
  );
};
