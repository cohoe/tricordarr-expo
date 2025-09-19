import React, {useState} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {useStyles} from '@tricordarr/Components/Context/Contexts/StyleContext';
import {ModalCard} from '@tricordarr/Components/Cards/ModalCard';
import {useModal} from '@tricordarr/Components/Context/Contexts/ModalContext';
import {PrimaryActionButton} from '@tricordarr/Components/Buttons/PrimaryActionButton';
import {useAppTheme} from '@tricordarr/Styles/Theme';
import {useUserNotificationData} from '@tricordarr/Components/Context/Contexts/UserNotificationDataContext';
import {useAuth} from '@tricordarr/Components/Context/Contexts/AuthContext';
import {useLogoutMutation} from '@tricordarr/Queries/Auth/LogoutMutations.ts';
import {useSocket} from '@tricordarr/Components/Context/Contexts/SocketContext';
import {useSettingsStack} from '@tricordarr/Components/Navigation/Stacks/SettingsStackNavigator.tsx';
import {usePrivilege} from '@tricordarr/Components/Context/Contexts/PrivilegeContext';
import {useQueryClient} from '@tanstack/react-query';
import {stopForegroundServiceWorker} from '@tricordarr/Libraries/Service';
import {WebSocketStorageActions} from '@tricordarr/Components/Reducers/Fez/FezSocketReducer.ts';
import {useConfig} from '@tricordarr/Components/Context/Contexts/ConfigContext.ts';

interface LogoutModalContentProps {
  allDevices: boolean;
}

const LogoutModalContent = ({allDevices = false}: LogoutModalContentProps) => {
  const {commonStyles} = useStyles();
  return (
    <>
      {allDevices && <Text style={[commonStyles.marginBottomSmall]}>Confirm log out all of your devices?</Text>}
      {!allDevices && <Text style={[commonStyles.marginBottomSmall]}>Confirm log out this device?</Text>}
    </>
  );
};

export const LogoutDeviceModalView = ({allDevices = false}: LogoutModalContentProps) => {
  const {setModalVisible} = useModal();
  const theme = useAppTheme();
  const settingsNavigation = useSettingsStack();

  const {setEnableUserNotifications} = useUserNotificationData();
  const {signOut} = useAuth();
  const logoutMutation = useLogoutMutation({
    onSuccess: () => {
      onLogout();
    },
  });
  const {closeNotificationSocket, dispatchFezSockets} = useSocket();
  const [loading, setLoading] = useState(false);
  const {clearPrivileges} = usePrivilege();
  const queryClient = useQueryClient();
  const {preRegistrationMode} = useConfig();

  const onLogout = () => {
    setEnableUserNotifications(false);
    closeNotificationSocket();
    dispatchFezSockets({
      type: WebSocketStorageActions.clear,
    });
    stopForegroundServiceWorker().then(() =>
      signOut(preRegistrationMode).then(() => {
        clearPrivileges();
        queryClient.clear();
        setModalVisible(false);
        setLoading(false);
        settingsNavigation.goBack();
      }),
    );
  };

  const logoutDevice = () => {
    setLoading(true);
    onLogout();
  };

  const logoutAll = () => {
    setLoading(true);
    logoutMutation.mutate();
  };

  const cardActions = (
    <PrimaryActionButton
      buttonColor={theme.colors.twitarrNegativeButton}
      buttonText={'Log Out'}
      onPress={allDevices ? logoutAll : logoutDevice}
      isLoading={logoutMutation.isLoading || loading}
      disabled={logoutMutation.isLoading || loading}
    />
  );

  return (
    <View>
      <ModalCard
        title={'Log Out'}
        closeButtonText={'Cancel'}
        content={<LogoutModalContent allDevices={allDevices} />}
        actions={cardActions}
      />
    </View>
  );
};
