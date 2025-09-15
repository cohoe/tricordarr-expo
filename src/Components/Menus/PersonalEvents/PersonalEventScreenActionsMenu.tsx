import { FezData } from '@tricordarr/libraries/Structs/ControllerStructs';
import React, { ReactNode, useState } from 'react';
import { Menu } from 'react-native-paper';
import { Item } from 'react-navigation-header-buttons';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { ReportModalView } from '@tricordarr/components/Views/Modals/ReportModalView';
import { useModal } from '@tricordarr/components/Context/Contexts/ModalContext';
import { PersonalEventDeleteModal } from '@tricordarr/components/Views/Modals/PersonalEventDeleteModal';
import { useScheduleStackNavigation } from '@tricordarr/components/Navigation/Stacks/ScheduleStackNavigator';
import { CommonStackComponents } from '@tricordarr/components/Navigation/CommonScreens';
import { AppHeaderMenu } from '@tricordarr/components/Menus/AppHeaderMenu';
import { useUserProfileQuery } from '@tricordarr/components/Queries/User/UserQueries';
import { FezType } from '@tricordarr/libraries/Enums/FezType';
import { FezCancelModal } from '@tricordarr/components/Views/Modals/FezCancelModal';

interface PersonalEventScreenActionsMenuProps {
  event: FezData;
}

export const PersonalEventScreenActionsMenu = (props: PersonalEventScreenActionsMenuProps) => {
  const [visible, setVisible] = useState(false);
  const { data: profilePublicData } = useUserProfileQuery();
  const { setModalContent, setModalVisible } = useModal();
  const navigation = useScheduleStackNavigation();
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleModal = (content: ReactNode) => {
    closeMenu();
    setModalContent(content);
    setModalVisible(true);
  };

  return (
    <AppHeaderMenu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Item title={'Actions'} iconName={AppIcons.menu} onPress={openMenu} />}>
      {props.event.owner.userID === profilePublicData?.header.userID && (
        <>
          {props.event.fezType === FezType.personalEvent ? (
            <Menu.Item
              leadingIcon={AppIcons.delete}
              title={'Delete'}
              onPress={() => handleModal(<PersonalEventDeleteModal personalEvent={props.event} />)}
            />
          ) : (
            <Menu.Item
              leadingIcon={AppIcons.cancel}
              title={'Cancel'}
              onPress={() => handleModal(<FezCancelModal fezData={props.event} />)}
              disabled={props.event.cancelled}
            />
          )}
        </>
      )}
      <Menu.Item
        leadingIcon={AppIcons.report}
        title={'Report'}
        onPress={() => handleModal(<ReportModalView fez={props.event} />)}
      />
      <Menu.Item
        leadingIcon={AppIcons.help}
        title={'Help'}
        onPress={() => {
          closeMenu();
          navigation.push(CommonStackComponents.scheduleHelpScreen);
        }}
      />
    </AppHeaderMenu>
  );
};
