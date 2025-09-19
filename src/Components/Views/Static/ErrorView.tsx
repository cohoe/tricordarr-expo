import React from 'react';
import {RefreshControl, View} from 'react-native';
import {Text} from 'react-native-paper';
import {AppView} from '@tricordarr/Components/Views/AppView';
import {useStyles} from '@tricordarr/Components/Context/Contexts/StyleContext';
import {ScrollingContentView} from '@tricordarr/Components/Views/Content/ScrollingContentView';
import {AppIcon} from '@tricordarr/Components/Icons/AppIcon';
import {AppIcons} from '@tricordarr/Libraries/Enums/Icons';

interface ErrorViewProps {
  refreshing: boolean;
  onRefresh: () => void;
}
export const ErrorView = (props: ErrorViewProps) => {
  const {commonStyles} = useStyles();
  const styles = {
    outerContainer: [commonStyles.flex, commonStyles.justifyCenter, commonStyles.alignItemsCenter],
    innerContainer: [commonStyles.justifyCenter, commonStyles.alignItemsCenter],
    contentContainer: [commonStyles.marginVerticalSmall],
  };
  return (
    <AppView>
      <ScrollingContentView
        isStack={true}
        refreshControl={<RefreshControl refreshing={props.refreshing} onRefresh={props.onRefresh} />}>
        <View style={styles.outerContainer}>
          <View style={styles.innerContainer}>
            <View style={styles.contentContainer}>
              <AppIcon icon={AppIcons.error} size={150} />
            </View>
            <View style={styles.contentContainer}>
              <Text>Something went wrong</Text>
            </View>
          </View>
        </View>
      </ScrollingContentView>
    </AppView>
  );
};
