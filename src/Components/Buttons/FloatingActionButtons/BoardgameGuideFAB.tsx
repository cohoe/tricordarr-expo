import React from 'react';
import {BaseFAB} from '@tricordarr/Components/Buttons/FloatingActionButtons/BaseFAB';
import {MainStackComponents, useMainStack} from '@tricordarr/Components/Navigation/Stacks/MainStackNavigator';
import {AppIcons} from '@tricordarr/Libraries/Enums/Icons';

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
