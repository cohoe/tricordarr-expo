import { FlexCenteredContentView } from '@tricordarr/components/Views/Content/FlexCenteredContentView';
import { Text } from 'react-native-paper';
import { PaddedContentView } from '@tricordarr/components/Views/Content/PaddedContentView';
import React from 'react';

export const LoadingPreviousHeader = () => {
  return (
    <PaddedContentView padTop={true}>
      <FlexCenteredContentView>
        <Text variant={'labelMedium'}>Loading previous...</Text>
      </FlexCenteredContentView>
    </PaddedContentView>
  );
};
