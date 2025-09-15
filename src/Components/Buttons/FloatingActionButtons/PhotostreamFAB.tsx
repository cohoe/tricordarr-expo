import React from 'react';
import { BaseFAB } from '@tricordarr/components/Buttons/FloatingActionButtons/BaseFAB';
import { MainStackComponents, useMainStack } from '@tricordarr/components/Navigation/Stacks/MainStackNavigator';

interface PhotostreamFABProps {
  showLabel?: boolean;
}

export const PhotostreamFAB = (props: PhotostreamFABProps) => {
  const mainStack = useMainStack();
  return (
    <BaseFAB
      onPress={() => mainStack.push(MainStackComponents.photostreamImageCreateScreen)}
      label={'New Post'}
      showLabel={props.showLabel}
    />
  );
};
