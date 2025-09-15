import React, { ReactNode } from 'react';
import { Menu } from 'react-native-paper';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import Clipboard from '@react-native-clipboard/clipboard';
import { FezData, FezPostData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { useModal } from '@tricordarr/components/Context/Contexts/ModalContext';
import { ReportModalView } from '@tricordarr/components/Views/Modals/ReportModalView';
import { FezType } from '@tricordarr/libraries/Enums/FezType';

interface FezPostActionsMenuProps {
  visible: boolean;
  closeMenu: () => void;
  anchor: ReactNode;
  fezPost: FezPostData;
  fez: FezData;
}

export const FezPostActionsMenu = ({ visible, closeMenu, anchor, fezPost, fez }: FezPostActionsMenuProps) => {
  const { setModalContent, setModalVisible } = useModal();

  const handleReport = () => {
    closeMenu();
    setModalContent(<ReportModalView fezPost={fezPost} />);
    setModalVisible(true);
  };

  return (
    <Menu visible={visible} onDismiss={closeMenu} anchor={anchor}>
      <Menu.Item
        dense={false}
        leadingIcon={AppIcons.copy}
        title={'Copy'}
        onPress={() => {
          Clipboard.setString(fezPost.text);
          closeMenu();
        }}
      />
      {fez && fez.fezType !== FezType.closed && (
        <Menu.Item dense={false} leadingIcon={AppIcons.report} title={'Report'} onPress={handleReport} />
      )}
    </Menu>
  );
};
