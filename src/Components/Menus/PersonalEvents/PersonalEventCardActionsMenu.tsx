import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { Divider, Menu } from 'react-native-paper';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { FezData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { PersonalEventDeleteModal } from '@tricordarr/components/Views/Modals/PersonalEventDeleteModal';
import { ReportModalView } from '@tricordarr/components/Views/Modals/ReportModalView';
import { useModal } from '@tricordarr/components/Context/Contexts/ModalContext';
import { CommonStackComponents, useCommonStack } from '@tricordarr/components/Navigation/CommonScreens';
import { useUserProfileQuery } from '@tricordarr/components/Queries/User/UserQueries';

interface PersonalEventCardActionsMenuProps {
  anchor: React.JSX.Element;
  eventData: FezData;
  menuVisible: boolean;
  setMenuVisible: Dispatch<SetStateAction<boolean>>;
  setRefreshing?: Dispatch<SetStateAction<boolean>>;
}

export const PersonalEventCardActionsMenu = (props: PersonalEventCardActionsMenuProps) => {
  const { data: profilePublicData } = useUserProfileQuery();
  const closeMenu = () => props.setMenuVisible(false);
  const { setModalContent, setModalVisible } = useModal();
  const navigation = useCommonStack();

  const handleModal = (content: ReactNode) => {
    closeMenu();
    setModalContent(content);
    setModalVisible(true);
  };

  return (
    <Menu visible={props.menuVisible} onDismiss={closeMenu} anchor={props.anchor}>
      {props.eventData.owner.userID === profilePublicData?.header.userID && (
        <>
          <Menu.Item
            leadingIcon={AppIcons.edit}
            title={'Edit'}
            onPress={() => {
              closeMenu();
              navigation.push(CommonStackComponents.personalEventEditScreen, {
                personalEvent: props.eventData,
              });
            }}
          />
          <Menu.Item
            leadingIcon={AppIcons.delete}
            title={'Delete'}
            onPress={() =>
              handleModal(<PersonalEventDeleteModal personalEvent={props.eventData} handleNavigation={false} />)
            }
          />
          <Divider bold={true} />
        </>
      )}
      <Menu.Item
        leadingIcon={AppIcons.report}
        title={'Report'}
        onPress={() => handleModal(<ReportModalView fez={props.eventData} />)}
      />
    </Menu>
  );
};
