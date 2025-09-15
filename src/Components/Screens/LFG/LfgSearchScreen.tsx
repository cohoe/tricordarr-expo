import { AppView } from '@tricordarr/components/Views/AppView';
import React, { useCallback, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LfgStackComponents, LfgStackParamList } from '@tricordarr/components/Navigation/Stacks/LFGStackNavigator';
import { ListTitleView } from '@tricordarr/components/Views/ListTitleView';
import { View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MaterialHeaderButton } from '@tricordarr/components/Buttons/MaterialHeaderButton';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { CommonStackComponents } from '@tricordarr/components/Navigation/CommonScreens';
import { LFGSearchBar } from '@tricordarr/components/Search/LFGSearchBar';

type Props = NativeStackScreenProps<LfgStackParamList, LfgStackComponents.lfgSearchScreen>;

export const LfgSearchScreen = ({ navigation, route }: Props) => {
  const getTitle = () => {
    if (route.params.endpoint) {
      const title = route.params.endpoint.charAt(0).toUpperCase() + route.params.endpoint.slice(1);
      return `Search ${title} LFGs`;
    }
    return 'Search LFGs';
  };

  const getNavButtons = useCallback(() => {
    return (
      <View>
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <Item
            title={'Help'}
            iconName={AppIcons.help}
            onPress={() => navigation.push(CommonStackComponents.lfgHelpScreen)}
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
      <ListTitleView title={getTitle()} />
      <LFGSearchBar endpoint={route.params.endpoint} />
    </AppView>
  );
};
