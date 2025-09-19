import React, {useCallback, useEffect} from 'react';
import {AppView} from '@tricordarr/../Views/AppView';
import {EventSearchBar} from '@tricordarr/../Search/EventSearchBar';
import {View} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {MaterialHeaderButton} from '@tricordarr/../Buttons/MaterialHeaderButton.tsx';
import {AppIcons} from '@tricordarr/../../Libraries/Enums/Icons.ts';
import {CommonStackComponents} from '@tricordarr/../Navigation/CommonScreens.tsx';
import {useScheduleStackNavigation} from '@tricordarr/../Navigation/Stacks/ScheduleStackNavigator.tsx';

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
