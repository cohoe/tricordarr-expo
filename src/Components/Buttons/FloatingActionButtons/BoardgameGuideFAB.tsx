import React from 'react';
import { BaseFAB } from '@tricordarr/components/Buttons/FloatingActionButtons/BaseFAB';
import { MainStackComponents, useMainStack } from '@tricordarr/components/Navigation/Stacks/MainStackNavigator';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';

interface BoardgameGuideFABProps {
  showLabel?: boolean;
}

export const BoardgameGuideFAB = (props: BoardgameGuideFABProps) => {
  const mainStack = useMainStack();
  return (
    <BaseFAB
      onPress={() => mainStack.push(MainStackComponents.boardgameRecommendScreen)}
      label={'Game Guide'}
      showLabel={props.showLabel}
      icon={AppIcons.games}
    />
  );
};
