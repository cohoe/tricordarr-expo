import {BaseFAB} from '@tricordarr/Components/Buttons/FloatingActionButtons/BaseFAB';
import {useScheduleStackNavigation} from '@tricordarr/Components/Navigation/Stacks/ScheduleStackNavigator';
import {CommonStackComponents} from '@tricordarr/Components/Navigation/CommonScreens';
import {AppIcons} from '@tricordarr/Libraries/Enums/Icons';

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
