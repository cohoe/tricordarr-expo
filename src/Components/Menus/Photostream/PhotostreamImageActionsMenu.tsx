import React, { ReactNode } from 'react';
import { Divider, Menu } from 'react-native-paper';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { useModal } from '@tricordarr/components/Context/Contexts/ModalContext';
import { ReportModalView } from '@tricordarr/components/Views/Modals/ReportModalView';
import { PhotostreamImageData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { usePrivilege } from '@tricordarr/components/Context/Contexts/PrivilegeContext';
import { ModerateMenuItem } from '@tricordarr/components/Menus/Items/ModerateMenuItem';
import { useCommonStack } from '@tricordarr/components/Navigation/CommonScreens';

interface PhotostreamImageActionsMenuProps {
  visible: boolean;
  closeMenu: () => void;
  anchor: ReactNode;
  image: PhotostreamImageData;
}

export const PhotostreamImageActionsMenu = ({ visible, closeMenu, anchor, image }: PhotostreamImageActionsMenuProps) => {
  const { setModalContent, setModalVisible } = useModal();
  const { hasModerator } = usePrivilege();
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
