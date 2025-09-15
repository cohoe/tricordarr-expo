import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { CommonStackComponents, CommonStackParamList } from '@tricordarr/components/Navigation/CommonScreens';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MaterialHeaderButton } from '@tricordarr/components/Buttons/MaterialHeaderButton';
import { HeaderEditButton } from '@tricordarr/components/Buttons/HeaderButtons/HeaderEditButton';
import { PersonalEventScreenActionsMenu } from '@tricordarr/components/Menus/PersonalEvents/PersonalEventScreenActionsMenu';
import { useFezQuery } from '@tricordarr/components/Queries/Fez/FezQueries';
import { ScheduleItemScreenBase } from '@tricordarr/components/Screens/Schedule/ScheduleItemScreenBase';
import notifee from '@notifee/react-native';
import { useConfig } from '@tricordarr/components/Context/Contexts/ConfigContext';
import { FezType } from '@tricordarr/libraries/Enums/FezType';
import { FezData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { useUserProfileQuery } from '@tricordarr/components/Queries/User/UserQueries';

type Props = NativeStackScreenProps<CommonStackParamList, CommonStackComponents.personalEventScreen>;

export const PersonalEventScreen = ({ navigation, route }: Props) => {
  const { appConfig } = useConfig();
  const { data, refetch, isFetching } = useFezQuery({
    fezID: route.params.eventID,
  });
  const { data: profilePublicData } = useUserProfileQuery();
  const eventData = data?.pages[0];
  const showChat =
    eventData?.fezType === FezType.privateEvent && FezData.isParticipant(eventData, profilePublicData?.header);

  const getNavButtons = useCallback(() => {
    return (
      <View>
        <HeaderButtons left HeaderButtonComponent={MaterialHeaderButton}>
          {eventData && (
            <>
              {showChat && (
                <Item
                  title={'Chat'}
                  iconName={AppIcons.chat}
                  onPress={() => navigation.push(CommonStackComponents.lfgChatScreen, { fezID: eventData.fezID })}
                />
              )}
              {eventData.owner.userID === profilePublicData?.header.userID && (
                <HeaderEditButton
                  iconName={AppIcons.edit}
                  onPress={() =>
                    navigation.push(CommonStackComponents.personalEventEditScreen, {
                      personalEvent: eventData,
                    })
                  }
                />
              )}
              <PersonalEventScreenActionsMenu event={eventData} />
            </>
          )}
        </HeaderButtons>
      </View>
    );
  }, [eventData, navigation, profilePublicData?.header.userID, showChat]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: getNavButtons,
      title: eventData?.fezType === FezType.privateEvent ? 'Private Event' : 'Personal Event',
    });
    if (appConfig.markReadCancelPush && eventData) {
      console.log('[PersonalEventScreen.tsx] auto canceling notifications.');
      notifee.cancelDisplayedNotification(eventData.fezID);
    }
  }, [getNavButtons, navigation, eventData, appConfig.markReadCancelPush]);

  return (
    <ScheduleItemScreenBase eventData={eventData} onRefresh={refetch} refreshing={isFetching} showLfgChat={showChat} />
  );
};
