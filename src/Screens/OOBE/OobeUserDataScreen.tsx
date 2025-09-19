import {AppView} from '@tricordarr/Components/Views/AppView';
import {OobeButtonsView} from '@tricordarr/Components/Views/OobeButtonsView';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OobeStackComponents, OobeStackParamList} from '@tricordarr/Components/Navigation/Stacks/OobeStackNavigator';
import {ScrollingContentView} from '@tricordarr/Components/Views/Content/ScrollingContentView';
import {Text} from 'react-native-paper';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView';
import {useAuth} from '@tricordarr/Components/Context/Contexts/AuthContext';
import {PrimaryActionButton} from '@tricordarr/Components/Buttons/PrimaryActionButton';
import {CommonStackComponents} from '@tricordarr/Components/Navigation/CommonScreens';
import {useAppTheme} from '@tricordarr/Styles/Theme';
import {useConfig} from '@tricordarr/Components/Context/Contexts/ConfigContext';

type Props = NativeStackScreenProps<OobeStackParamList, OobeStackComponents.oobeUserDataScreen>;

export const OobeUserDataScreen = ({navigation}: Props) => {
  const {tokenData} = useAuth();
  const theme = useAppTheme();
  const {preRegistrationMode} = useConfig();

  return (
    <AppView safeEdges={['bottom']}>
      <ScrollingContentView>
        <PaddedContentView>
          <Text>
            You can optionally fill out a user profile that is visible to other Twitarr users. Would you like to do this
            now? All fields are optional. You can always do it later or not at all.
          </Text>
        </PaddedContentView>
        <PaddedContentView>
          <PrimaryActionButton
            buttonText={'Setup Profile'}
            buttonColor={theme.colors.twitarrNeutralButton}
            onPress={() => {
              if (tokenData) {
                navigation.push(CommonStackComponents.userProfileScreen, {
                  userID: tokenData?.userID,
                  enableContent: false,
                  oobe: true,
                });
              }
            }}
            disabled={!tokenData}
          />
        </PaddedContentView>
        {preRegistrationMode && (
          <>
            <PaddedContentView>
              <Text>
                You can optionally follow official and shadow events in the schedule. Would you like to do this now? You
                can always do it later or not at all. This will add them to your in-app day planner and generate
                reminder notifications. If you have simultaneous internet and Twitarr access you can also import from a
                Sched.com account.
              </Text>
            </PaddedContentView>
            <PaddedContentView>
              <Text>You are in pre-registration mode. The schedule may not be available yet.</Text>
            </PaddedContentView>

            <PaddedContentView>
              <PrimaryActionButton
                buttonText={'View Events'}
                buttonColor={theme.colors.twitarrNeutralButton}
                onPress={() => {
                  if (tokenData) {
                    navigation.push(OobeStackComponents.oobeScheduleDayScreen, {
                      oobe: true,
                    });
                  }
                }}
                disabled={!tokenData}
              />
            </PaddedContentView>
          </>
        )}
      </ScrollingContentView>
      <OobeButtonsView
        leftOnPress={() => navigation.goBack()}
        rightText={'Next'}
        rightOnPress={() => navigation.push(OobeStackComponents.oobeFinishScreen)}
      />
    </AppView>
  );
};
