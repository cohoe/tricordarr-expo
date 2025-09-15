import { RefreshControl, View } from 'react-native';
import { ScrollingContentView } from '@tricordarr/components/Views/Content/ScrollingContentView';
import { PaddedContentView } from '@tricordarr/components/Views/Content/PaddedContentView';
import { Text } from 'react-native-paper';
import React from 'react';

interface ForumEmptyListViewProps {
  refreshing: boolean;
  onRefresh: () => void;
}

export const ForumEmptyListView = ({ refreshing, onRefresh }: ForumEmptyListViewProps) => {
  return (
    <View>
      <ScrollingContentView
        isStack={true}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <PaddedContentView padTop={true}>
          <Text>No threads to display.</Text>
        </PaddedContentView>
      </ScrollingContentView>
    </View>
  );
};
