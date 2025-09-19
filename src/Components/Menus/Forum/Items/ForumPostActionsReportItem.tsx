import {ReportModalView} from '@tricordarr/Components/Views/Modals/ReportModalView';
import React from 'react';
import {PostData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {useModal} from '@tricordarr/Components/Context/Contexts/ModalContext';
import {Menu} from 'react-native-paper';
import {AppIcons} from '@tricordarr/Libraries/Enums/Icons';

interface ForumPostActionsReportItemProps {
  closeMenu: () => void;
  forumPost: PostData;
}

export const ForumPostActionsReportItem = ({closeMenu, forumPost}: ForumPostActionsReportItemProps) => {
  const {setModalContent, setModalVisible} = useModal();
  const handleReport = () => {
    closeMenu();
    setModalContent(<ReportModalView forumPost={forumPost} />);
    setModalVisible(true);
  };

  return <Menu.Item title={'Report'} dense={false} leadingIcon={AppIcons.report} onPress={handleReport} />;
};
