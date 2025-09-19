import React, {ReactNode} from 'react';
import {Divider, Menu} from 'react-native-paper';
import {AppIcons} from '@tricordarr/Libraries/Enums/Icons';
import {useModal} from '@tricordarr/Components/Context/Contexts/ModalContext';
import {ReportModalView} from '@tricordarr/Components/Views/Modals/ReportModalView';
import {PhotostreamImageData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {usePrivilege} from '@tricordarr/Components/Context/Contexts/PrivilegeContext';
import {ModerateMenuItem} from '@tricordarr/Components/Menus/Items/ModerateMenuItem';
import {useCommonStack} from '@tricordarr/Components/Navigation/CommonScreens';

interface PhotostreamImageActionsMenuProps {
  visible: boolean;
  closeMenu: () => void;
  anchor: ReactNode;
  image: PhotostreamImageData;
}

export const PhotostreamImageActionsMenu = ({visible, closeMenu, anchor, image}: PhotostreamImageActionsMenuProps) => {
  const {setModalContent, setModalVisible} = useModal();
  const {hasModerator} = usePrivilege();
  const commonNavigation = useCommonStack();

  const handleReport = () => {
    closeMenu();
    setModalContent(<ReportModalView photostreamImage={image} />);
    setModalVisible(true);
  };

  return (
    <Menu visible={visible} onDismiss={closeMenu} anchor={anchor}>
      <Menu.Item dense={false} leadingIcon={AppIcons.report} title={'Report'} onPress={handleReport} />
      {hasModerator && (
        <>
          <Divider bold={true} />
          <ModerateMenuItem
            closeMenu={closeMenu}
            resourceID={image.postID.toString()}
            resource={'photostream'}
            navigation={commonNavigation}
          />
        </>
      )}
    </Menu>
  );
};
