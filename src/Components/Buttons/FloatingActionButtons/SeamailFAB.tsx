import * as React from 'react';
import { useChatStack } from '@tricordarr/components/Navigation/Stacks/ChatStackNavigator';
import { CommonStackComponents } from '@tricordarr/components/Navigation/CommonScreens';
import { BaseFAB } from '@tricordarr/components/Buttons/FloatingActionButtons/BaseFAB';
import { usePrivilege } from '@tricordarr/components/Context/Contexts/PrivilegeContext';

interface SeamailFABProps {
  showLabel?: boolean;
}

export const SeamailFAB = (props: SeamailFABProps) => {
  const chatNavigation = useChatStack();
  const { asModerator, asTwitarrTeam } = usePrivilege();

  return (
    <BaseFAB
      onPress={() =>
        chatNavigation.push(CommonStackComponents.seamailCreateScreen, {
          initialAsModerator: asModerator,
          initialAsTwitarrTeam: asTwitarrTeam,
        })
      }
      label={'New Seamail'}
      showLabel={props.showLabel}
    />
  );
};
