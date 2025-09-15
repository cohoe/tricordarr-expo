import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useStyles } from '@tricordarr/components/Context/Contexts/StyleContext';
import { ModalCard } from '@tricordarr/components/Cards/ModalCard';
import { useModal } from '@tricordarr/components/Context/Contexts/ModalContext';
import { PrimaryActionButton } from '@tricordarr/components/Buttons/PrimaryActionButton';
import { useAppTheme } from '@tricordarr/styles/Theme';
import { useUserNotificationData } from '@tricordarr/components/Context/Contexts/UserNotificationDataContext';
import { useAuth } from '@tricordarr/components/Context/Contexts/AuthContext';
import { useLogoutMutation } from '@tricordarr/components/Queries/Auth/LogoutMutations';
import { useSocket } from '@tricordarr/components/Context/Contexts/SocketContext';
import { useSettingsStack } from '@tricordarr/components/Navigation/Stacks/SettingsStackNavigator';
import { usePrivilege } from '@tricordarr/components/Context/Contexts/PrivilegeContext';
import { useQueryClient } from '@tanstack/react-query';
import { stopForegroundServiceWorker } from '@tricordarr/libraries/Service';
import { WebSocketStorageActions } from '@tricordarr/components/Reducers/Fez/FezSocketReducer';
import { useConfig } from '@tricordarr/components/Context/Contexts/ConfigContext';

interface LogoutModalContentProps {
  allDevices: boolean;
}

const LogoutModalContent = ({ allDevices = false }: LogoutModalContentProps) => {
  const { commonStyles } = useStyles();
  return (
    <>
      {allDevices && <Text style={[commonStyles.marginBottomSmall]}>Confirm log out all of your devices?</Text>}
      {!allDevices && <Text style={[commonStyles.marginBottomSmall]}>Confirm log out this device?</Text>}
    </>
  );
};

export const LogoutDeviceModalView = ({ allDevices = false }: LogoutModalContentProps) => {
  const { setModalVisible } = useModal();
  const theme = useAppTheme();
  const settingsNavigation = useSettingsStack();

  const { setEnableUserNotifications } = useUserNotificationData();
  const { signOut } = useAuth();
  const logoutMutation = useLogoutMutation({
    onSuccess: () => {
      onLogout();
    },
  });
  const { closeNotificationSocket, dispatchFezSockets } = useSocket();
  const [loading, setLoading] = useState(false);
  const { clearPrivileges } = usePrivilege();
  const queryClient = useQueryClient();
  const { preRegistrationMode } = useConfig();

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
