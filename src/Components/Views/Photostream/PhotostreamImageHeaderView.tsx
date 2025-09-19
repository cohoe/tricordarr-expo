import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {UserAvatarImage} from '@tricordarr/Components/Images/UserAvatarImage';
import {UserBylineTag} from '@tricordarr/Components/Text/Tags/UserBylineTag';
import {PhotostreamImageData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {useStyles} from '@tricordarr/Components/Context/Contexts/StyleContext';
import {IconButton} from 'react-native-paper';
import {AppIcons} from '@tricordarr/Libraries/Enums/Icons';
import {PhotostreamImageActionsMenu} from '@tricordarr/Components/Menus/Photostream/PhotostreamImageActionsMenu';
import {RelativeTimeTag} from '@tricordarr/Components/Text/Tags/RelativeTimeTag';
import {CommonStackComponents, useCommonStack} from '@tricordarr/Components/Navigation/CommonScreens';

interface PhotostreamAuthorViewProps {
  image: PhotostreamImageData;
}

export const PhotostreamImageHeaderView = (props: PhotostreamAuthorViewProps) => {
  const {commonStyles} = useStyles();
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
