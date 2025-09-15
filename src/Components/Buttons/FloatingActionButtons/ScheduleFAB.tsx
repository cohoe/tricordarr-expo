import * as React from 'react';
import { FabGroupAction } from '@tricordarr/components/Buttons/FloatingActionButtons/FABGroupAction';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { useScheduleStackNavigation } from '@tricordarr/components/Navigation/Stacks/ScheduleStackNavigator';
import { BaseFABGroup } from '@tricordarr/components/Buttons/FloatingActionButtons/BaseFABGroup';
import { CommonStackComponents } from '@tricordarr/components/Navigation/CommonScreens';

interface ScheduleFABProps {
  selectedDay?: number;
  showLabel?: boolean;
}

export const ScheduleFAB = (props: ScheduleFABProps) => {
  const navigation = useScheduleStackNavigation();

  const actions = [
    FabGroupAction({
      icon: AppIcons.new,
      label: 'Create Personal Event',
      onPress: () =>
        navigation.push(CommonStackComponents.personalEventCreateScreen, {
          cruiseDay: props.selectedDay,
        }),
    }),
    FabGroupAction({
      icon: AppIcons.personalEvent,
      label: 'Personal Events',
      onPress: () => navigation.push(CommonStackComponents.schedulePrivateEventsScreen),
    }),
  ];

  return <BaseFABGroup actions={actions} openLabel={'Schedule'} icon={AppIcons.events} showLabel={props.showLabel} />;
};
