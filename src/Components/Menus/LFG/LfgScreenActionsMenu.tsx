import React, {ReactNode, useState} from 'react';
import {Menu} from 'react-native-paper';
import {AppIcons} from '@tricordarr/Libraries/Enums/Icons';
import {Item} from 'react-navigation-header-buttons';
import {usePrivilege} from '@tricordarr/Components/Context/Contexts/PrivilegeContext';
import {FezData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {ReportModalView} from '@tricordarr/Components/Views/Modals/ReportModalView';
import {useModal} from '@tricordarr/Components/Context/Contexts/ModalContext';
import {FezCancelModal} from '@tricordarr/Components/Views/Modals/FezCancelModal';
import {useLFGStackNavigation} from '@tricordarr/Components/Navigation/Stacks/LFGStackNavigator';
import {CommonStackComponents} from '@tricordarr/Components/Navigation/CommonScreens';
import {AppHeaderMenu} from '@tricordarr/Components/Menus/AppHeaderMenu';
import {useUserProfileQuery} from '@tricordarr/Queries/User/UserQueries';

export const LfgScreenActionsMenu = ({fezData}: {fezData: FezData}) => {
  const [visible, setVisible] = useState(false);
  const navigation = useLFGStackNavigation();
  const {hasModerator} = usePrivilege();
  const {setModalContent, setModalVisible} = useModal();
  const {data: profilePublicData} = useUserProfileQuery();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const menuAnchor = <Item title={'LFG Menu'} iconName={AppIcons.menu} onPress={openMenu} />;

  const handleModal = (content: ReactNode) => {
    closeMenu();
    setModalContent(content);
    setModalVisible(true);
  };

  return (
    <AppHeaderMenu visible={visible} onDismiss={closeMenu} anchor={menuAnchor}>
      {fezData.owner.userID === profilePublicData?.header.userID && (
        <Menu.Item
          leadingIcon={AppIcons.cancel}
          title={'Cancel'}
          onPress={() => handleModal(<FezCancelModal fezData={fezData} />)}
          disabled={fezData.cancelled}
        />
      )}
      <Menu.Item
        leadingIcon={AppIcons.report}
        title={'Report'}
        onPress={() => handleModal(<ReportModalView fez={fezData} />)}
      />
      {hasModerator && (
        <Menu.Item
          leadingIcon={AppIcons.moderator}
          title={'Moderate'}
          onPress={() => {
            navigation.push(CommonStackComponents.siteUIScreen, {
              resource: 'lfg',
              id: fezData.fezID,
              moderate: true,
            });
            closeMenu();
          }}
        />
      )}
      <Menu.Item
        leadingIcon={AppIcons.help}
        title={'Help'}
        onPress={() => {
          navigation.push(CommonStackComponents.lfgHelpScreen);
          closeMenu();
        }}
      />
    </AppHeaderMenu>
  );
};
