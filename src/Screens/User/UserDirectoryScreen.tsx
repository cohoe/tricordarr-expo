import React, {useCallback, useEffect} from 'react';
import {AppView} from '@tricordarr/../Views/AppView';
import {ScrollingContentView} from '@tricordarr/../Views/Content/ScrollingContentView';
import {PaddedContentView} from '@tricordarr/../Views/Content/PaddedContentView';
import {UserSearchBar} from '@tricordarr/../Search/UserSearchBar';
import {UserDirectoryText} from '@tricordarr/../Text/UserRelationsText';
import {useAuth} from '@tricordarr/../Context/Contexts/AuthContext';
import {NotLoggedInView} from '@tricordarr/../Views/Static/NotLoggedInView';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommonStackComponents} from '@tricordarr/../Navigation/CommonScreens';
import {MainStackComponents, MainStackParamList} from '@tricordarr/../Navigation/Stacks/MainStackNavigator';
import {View} from 'react-native';
import {HeaderButtons} from 'react-navigation-header-buttons';
import {MaterialHeaderButton} from '@tricordarr/../Buttons/MaterialHeaderButton.tsx';
import {UserDirectoryScreenActionsMenu} from '@tricordarr/../Menus/User/UserDirectoryScreenActionsMenu.tsx';

type Props = NativeStackScreenProps<MainStackParamList, MainStackComponents.userDirectoryScreen>;
export const UserDirectoryScreen = ({navigation}: Props) => {
  const {isLoggedIn} = useAuth();

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
