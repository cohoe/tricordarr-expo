import React, { useCallback, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '@tricordarr/components/Navigation/Stacks/MainStackNavigator';
import { usePerformerQuery } from '@tricordarr/components/Queries/Performer/PerformerQueries';
import { View } from 'react-native';
import { LoadingView } from '@tricordarr/components/Views/Static/LoadingView';
import { PerformerActionsMenu } from '@tricordarr/components/Menus/Performer/PerformerActionsMenu';
import { MaterialHeaderButton } from '@tricordarr/components/Buttons/MaterialHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CommonStackComponents } from '@tricordarr/components/Navigation/CommonScreens';
import { PerformerScreenBase } from '@tricordarr/components/Screens/Performer/PerformerScreenBase';
import { useUserProfileQuery } from '@tricordarr/components/Queries/User/UserQueries';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';

type Props = NativeStackScreenProps<MainStackParamList, CommonStackComponents.performerScreen>;

export const PerformerScreen = ({ route, navigation }: Props) => {
  const { data, refetch, isFetching } = usePerformerQuery(route.params.id);
  const { data: profilePublicData } = useUserProfileQuery();

  const getHeaderButtons = useCallback(() => {
    const eventID = route.params.eventID;
    return (
      <View>
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          {data && eventID && profilePublicData && profilePublicData.header.userID === data?.user?.userID && (
            <Item
              title={'Edit'}
              iconName={AppIcons.edit}
              onPress={() =>
                navigation.push(CommonStackComponents.performerEditScreen, {
                  performerData: data,
                  eventID: eventID,
                })
              }
            />
          )}
          <PerformerActionsMenu performerData={data} />
        </HeaderButtons>
      </View>
    );
  }, [data, navigation, profilePublicData, route]);

  const onRefresh = async () => {
    await refetch();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: getHeaderButtons,
    });
  }, [navigation, getHeaderButtons]);

  if (!data) {
    return <LoadingView />;
  }

  return <PerformerScreenBase performerData={data} onRefresh={onRefresh} isFetching={isFetching} />;
};
