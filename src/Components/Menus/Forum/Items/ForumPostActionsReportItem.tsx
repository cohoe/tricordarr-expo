import {ReportModalView} from '@tricordarr/components/Views/Modals/ReportModalView';
import React from 'react';
import {PostData} from '@tricordarr/libraries/Structs/ControllerStructs';
import {useModal} from '@tricordarr/components/Context/Contexts/ModalContext';
import {Menu} from 'react-native-paper';
import {AppIcons} from '@tricordarr/libraries/Enums/Icons';

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
