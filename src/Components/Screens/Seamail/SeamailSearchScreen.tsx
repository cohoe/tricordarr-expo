import React, { useCallback, useEffect } from 'react';
import { AppView } from '@tricordarr/components/Views/AppView';
import { SeamailSearchBar } from '@tricordarr/components/Search/SeamailSearchBar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChatStackParamList, ChatStackScreenComponents } from '@tricordarr/components/Navigation/Stacks/ChatStackNavigator';
import { NotImplementedView } from '@tricordarr/components/Views/Static/NotImplementedView';
import { View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MaterialHeaderButton } from '@tricordarr/components/Buttons/MaterialHeaderButton';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { CommonStackComponents } from '@tricordarr/components/Navigation/CommonScreens';

type SeamailSearchScreenProps = NativeStackScreenProps<
  ChatStackParamList,
  ChatStackScreenComponents.seamailSearchScreen
>;

export const SeamailSearchScreen = ({ navigation, route }: SeamailSearchScreenProps) => {
  const getNavButtons = useCallback(() => {
    return (
      <View>
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <Item
            title={'Help'}
            iconName={AppIcons.help}
            onPress={() => navigation.push(CommonStackComponents.seamailHelpScreen)}
          />
        </HeaderButtons>
      </View>
    );
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: getNavButtons,
    });
  }, [getNavButtons, navigation]);

  if (route.params.forUser) {
    const text = `Seamail search is available for user accounts, not for privileged accounts like ${route.params.forUser}.`;
    return <NotImplementedView additionalText={text} />;
  }
  return (
    <AppView>
      <SeamailSearchBar />
    </AppView>
  );
};
