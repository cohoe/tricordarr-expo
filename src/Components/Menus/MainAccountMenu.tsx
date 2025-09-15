import { UserAvatarImage } from '@tricordarr/components/Images/UserAvatarImage';
import { Divider, Menu } from 'react-native-paper';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { useAuth } from '@tricordarr/components/Context/Contexts/AuthContext';
import { MainStackComponents, useMainStack } from '@tricordarr/components/Navigation/Stacks/MainStackNavigator';
import { CommonStackComponents } from '@tricordarr/components/Navigation/CommonScreens';
import { SettingsStackScreenComponents } from '@tricordarr/components/Navigation/Stacks/SettingsStackNavigator';
import { AppHeaderMenu } from '@tricordarr/components/Menus/AppHeaderMenu';
import { useUserProfileQuery } from '@tricordarr/components/Queries/User/UserQueries';

export const MainAccountMenu = () => {
  const { data: profilePublicData } = useUserProfileQuery();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const closeMenu = () => setIsMenuVisible(false);
  const mainNavigation = useMainStack();
  const { isLoggedIn } = useAuth();

  const handleManage = () => {
    closeMenu();
    mainNavigation.push(MainStackComponents.mainSettingsScreen, {
      screen: SettingsStackScreenComponents.accountManagement,
    });
  };

  const handleProfile = () => {
    closeMenu();
    if (profilePublicData) {
      mainNavigation.push(CommonStackComponents.userProfileScreen, {
        userID: profilePublicData.header.userID,
      });
    }
  };

  const handleSettings = () => {
    closeMenu();
    mainNavigation.push(MainStackComponents.mainSettingsScreen, {
      screen: SettingsStackScreenComponents.settings,
    });
  };

  const handleLogin = () => {
    closeMenu();
    mainNavigation.push(MainStackComponents.mainSettingsScreen, {
      screen: SettingsStackScreenComponents.login,
    });
  };

  const handleRegister = () => {
    closeMenu();
    mainNavigation.push(MainStackComponents.mainSettingsScreen, {
      screen: SettingsStackScreenComponents.registerScreen,
    });
  };

  const handleHelp = () => {
    closeMenu();
    mainNavigation.push(MainStackComponents.mainHelpScreen);
  };

  const getAvatarImage = () => <UserAvatarImage userHeader={profilePublicData?.header} small={true} />;

  return (
    <AppHeaderMenu
      visible={isMenuVisible}
      anchor={<TouchableOpacity onPress={() => setIsMenuVisible(true)}>{getAvatarImage()}</TouchableOpacity>}
      onDismiss={closeMenu}>
      {isLoggedIn && profilePublicData ? (
        <>
          <Menu.Item leadingIcon={getAvatarImage} title={`Current User: ${profilePublicData.header.username}`} />
          <Divider bold={true} />
          <Menu.Item leadingIcon={AppIcons.profile} title={'Your Profile'} onPress={handleProfile} />
          <Menu.Item leadingIcon={AppIcons.user} title={'Manage Account'} onPress={handleManage} />
        </>
      ) : (
        <>
          <Menu.Item leadingIcon={AppIcons.user} title={'Login'} onPress={handleLogin} />
          <Menu.Item leadingIcon={AppIcons.registrationCode} title={'Register'} onPress={handleRegister} />
        </>
      )}
      <Divider bold={true} />
      <Menu.Item leadingIcon={AppIcons.settings} title={'Settings'} onPress={handleSettings} />
      <Divider bold={true} />
      <Menu.Item leadingIcon={AppIcons.help} title={'Help'} onPress={handleHelp} />
    </AppHeaderMenu>
  );
};
