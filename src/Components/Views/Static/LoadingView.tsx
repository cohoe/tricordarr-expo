import React from 'react';
import {RefreshControl, View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {ScrollingContentView} from '@tricordarr/components/Views/Content/ScrollingContentView';
import {useStyles} from '@tricordarr/components/Context/Contexts/StyleContext';
import {AppView} from '@tricordarr/components/Views/AppView';

interface LoadingViewProps {
  refreshing?: boolean;
  onRefresh?: () => void;
}

export const LoadingView = (props: LoadingViewProps) => {
  const {commonStyles} = useStyles();
  return (
    <AppView safeEdges={['bottom', 'top']}>
      <ScrollingContentView
        refreshControl={<RefreshControl refreshing={props.refreshing || false} onRefresh={props.onRefresh} />}>
        <ActivityIndicator />
        <View
          style={[
            commonStyles.flex,
            commonStyles.justifyCenter,
            commonStyles.alignItemsCenter,
            commonStyles.marginTop,
          ]}>
          <Text>Loading...</Text>
        </View>
      </ScrollingContentView>
    </AppView>
  );
};
