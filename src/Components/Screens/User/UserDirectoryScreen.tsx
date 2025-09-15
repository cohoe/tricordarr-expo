import React, { useCallback, useEffect } from 'react';
import { AppView } from '@tricordarr/components/Views/AppView';
import { ScrollingContentView } from '@tricordarr/components/Views/Content/ScrollingContentView';
import { PaddedContentView } from '@tricordarr/components/Views/Content/PaddedContentView';
import { UserSearchBar } from '@tricordarr/components/Search/UserSearchBar';
import { UserDirectoryText } from '@tricordarr/components/Text/UserRelationsText';
import { useAuth } from '@tricordarr/components/Context/Contexts/AuthContext';
import { NotLoggedInView } from '@tricordarr/components/Views/Static/NotLoggedInView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonStackComponents } from '@tricordarr/components/Navigation/CommonScreens';
import { MainStackComponents, MainStackParamList } from '@tricordarr/components/Navigation/Stacks/MainStackNavigator';
import { View } from 'react-native';
import { HeaderButtons } from 'react-navigation-header-buttons';
import { MaterialHeaderButton } from '@tricordarr/components/Buttons/MaterialHeaderButton';
import { UserDirectoryScreenActionsMenu } from '@tricordarr/components/Menus/User/UserDirectoryScreenActionsMenu';

type Props = NativeStackScreenProps<MainStackParamList, MainStackComponents.userDirectoryScreen>;
export const UserDirectoryScreen = ({ navigation }: Props) => {
  const { isLoggedIn } = useAuth();

  const getNavButtons = useCallback(() => {
    if (!isLoggedIn) {
      return <></>;
    }
    return (
      <View>
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <UserDirectoryScreenActionsMenu />
        </HeaderButtons>
      </View>
    );
  }, [isLoggedIn]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: getNavButtons,
    });
  }, [navigation, getNavButtons]);

  if (!isLoggedIn) {
    return <NotLoggedInView />;
  }

  return (
    <AppView>
      <ScrollingContentView>
        <PaddedContentView>
          <UserDirectoryText />
        </PaddedContentView>
        <PaddedContentView>
          <UserSearchBar
            excludeHeaders={[]}
            onPress={user =>
              navigation.push(CommonStackComponents.userProfileScreen, {
                userID: user.userID,
              })
            }
            clearOnPress={false}
          />
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};
