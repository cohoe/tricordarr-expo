import React from 'react';
import {ScrollingContentView} from '@tricordarr/Components/Views/Content/ScrollingContentView';
import {AppView} from '@tricordarr/Components/Views/AppView';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView';
import {ListSection} from '@tricordarr/Components/Lists/ListSection';
import {AppIcons} from '@tricordarr/Libraries/Enums/Icons';
import {MinorActionListItem} from '@tricordarr/Components/Lists/Items/MinorActionListItem';
import {
  SettingsStackParamList,
  SettingsStackScreenComponents,
  useSettingsStack,
} from '@tricordarr/Components/Navigation/Stacks/SettingsStackNavigator';
import {useModal} from '@tricordarr/Components/Context/Contexts/ModalContext';
import {LogoutDeviceModalView} from '@tricordarr/Components/Views/Modals/LogoutModal';
import {ListSubheader} from '@tricordarr/Components/Lists/ListSubheader';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommonStackComponents} from '@tricordarr/Components/Navigation/CommonScreens';
import {useUserProfileQuery} from '@tricordarr/Queries/User/UserQueries';

type Props = NativeStackScreenProps<SettingsStackParamList, SettingsStackScreenComponents.accountManagement>;
export const AccountManagementScreen = ({navigation}: Props) => {
  const settingsNavigation = useSettingsStack();
  const {data: profilePublicData} = useUserProfileQuery();
  const {setModalContent, setModalVisible} = useModal();

  const handleLogoutModal = (allDevices = false) => {
    setModalContent(<LogoutDeviceModalView allDevices={allDevices} />);
    setModalVisible(true);
  };

  // Need to conditional on ProfilePublicData in case it never loaded because the user lost communication
  // with the server. Logout device should still be allowed when no local data because it clears state.
  return (
    <AppView>
      <ScrollingContentView isStack={true}>
        <PaddedContentView padSides={false}>
          {profilePublicData && (
            <ListSection>
              <ListSubheader>Manage Your Account</ListSubheader>
              <MinorActionListItem
                title={'Change Username'}
                icon={AppIcons.edituser}
                onPress={() => settingsNavigation.push(SettingsStackScreenComponents.changeUsername)}
              />
              <MinorActionListItem
                title={'Change Password'}
                icon={AppIcons.password}
                onPress={() => settingsNavigation.push(SettingsStackScreenComponents.changePassword)}
              />
              <MinorActionListItem
                title={'Create Alt Account'}
                icon={AppIcons.altAccount}
                onPress={() =>
                  navigation.push(CommonStackComponents.siteUIScreen, {
                    resource: 'createAltAccount',
                  })
                }
              />
            </ListSection>
          )}
          <ListSection>
            <ListSubheader>Log Out</ListSubheader>
            <MinorActionListItem
              title={'Logout this device'}
              icon={AppIcons.logout}
              onPress={() => handleLogoutModal()}
            />
            {profilePublicData && (
              <MinorActionListItem
                title={'Logout all devices'}
                icon={AppIcons.error}
                onPress={() => handleLogoutModal(true)}
              />
            )}
          </ListSection>
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};
