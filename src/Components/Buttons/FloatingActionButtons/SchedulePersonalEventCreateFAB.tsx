import { BaseFAB } from '@tricordarr/components/Buttons/FloatingActionButtons/BaseFAB';
import { useScheduleStackNavigation } from '@tricordarr/components/Navigation/Stacks/ScheduleStackNavigator';
import { CommonStackComponents } from '@tricordarr/components/Navigation/CommonScreens';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';

export const SchedulePersonalEventCreateFAB = () => {
  const navigation = useScheduleStackNavigation();
  return (
    <BaseFAB
      onPress={() => navigation.push(CommonStackComponents.personalEventCreateScreen, {})}
      icon={AppIcons.eventCreate}
      label={'New Event'}
    />
  );
};
