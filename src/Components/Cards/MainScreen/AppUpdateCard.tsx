import {Card, TouchableRipple, Text} from 'react-native-paper';
import {useStyles} from '@tricordarr/Components/Context/Contexts/StyleContext';
import {Linking, StyleSheet, View} from 'react-native';
import React from 'react';
import {AppIcons} from '@tricordarr/Libraries/Enums/Icons';
import {AppIcon} from '@tricordarr/Components/Icons/AppIcon';
// DISABLED FOR EXPO-NOTIFICATIONS MIGRATION
// import {AndroidColor} from '@notifee/react-native';
type AndroidColor = string; // Simple fallback type for migration

interface AppUpdateCardProps {
  currentVersion: string;
  latestVersion: string;
}

export const AppUpdateCard = (props: AppUpdateCardProps) => {
  const {commonStyles} = useStyles();

  const styles = StyleSheet.create({
    card: {
      ...commonStyles.twitarrNegative,
      ...commonStyles.onTwitarrButton,
    },
    content: {
      ...commonStyles.marginVertical,
    },
    textWrapper: {
      ...commonStyles.flexRow,
      ...commonStyles.alignItemsCenter,
      ...commonStyles.marginBottomSmall,
    },
    headerText: {
      ...commonStyles.onTwitarrButton,
      ...commonStyles.bold,
    },
    bodyText: {
      ...commonStyles.onTwitarrButton,
    },
  });

  const onPress = () => Linking.openURL('https://play.google.com/store/apps/details?id=com.tricordarr');

  return (
    <Card style={styles.card}>
      <TouchableRipple onPress={onPress}>
        <View>
          <Card.Content style={styles.content}>
            <View style={styles.textWrapper}>
              <AppIcon icon={AppIcons.twitarr} color={AndroidColor.WHITE} />
              <Text style={styles.headerText}>Tricordarr is out of date.</Text>
            </View>
            <View>
              <Text style={styles.bodyText}>
                Update to the latest version ({props.latestVersion}) to ensure a smooth experience. You are currently
                running version {props.currentVersion}.
              </Text>
            </View>
          </Card.Content>
        </View>
      </TouchableRipple>
    </Card>
  );
};
