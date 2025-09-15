import React, { useCallback, useEffect } from 'react';
import { AppView } from '@tricordarr/components/Views/AppView';
import { EventSearchBar } from '@tricordarr/components/Search/EventSearchBar';
import { View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MaterialHeaderButton } from '@tricordarr/components/Buttons/MaterialHeaderButton';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { CommonStackComponents } from '@tricordarr/components/Navigation/CommonScreens';
import { useScheduleStackNavigation } from '@tricordarr/components/Navigation/Stacks/ScheduleStackNavigator';

export const EventSearchScreen = () => {
  const navigation = useScheduleStackNavigation();

  const getNavButtons = useCallback(() => {
    return (
      <View>
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <Item
            title={'Help'}
            iconName={AppIcons.help}
            onPress={() => navigation.push(CommonStackComponents.scheduleHelpScreen)}
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

  return (
    <AppView>
      <EventSearchBar />
    </AppView>
  );
};
