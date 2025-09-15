import React from 'react';
import {PrimaryActionButton} from '@tricordarr/components/Buttons/PrimaryActionButton';
import {cancelTestNotification, displayTestNotification} from '@tricordarr/libraries/Notifications/TestNotification';
import {useAppTheme} from '@tricordarr/styles/Theme';
import {ScrollingContentView} from '@tricordarr/components/Views/Content/ScrollingContentView';
import {PaddedContentView} from '@tricordarr/components/Views/Content/PaddedContentView';
import {AppView} from '@tricordarr/components/Views/AppView';
import {useStyles} from '@tricordarr/components/Context/Contexts/StyleContext';
import {generateContentNotification} from '@tricordarr/libraries/Notifications/Content';
import {eventChannel} from '@tricordarr/libraries/Notifications/Channels';
import {NotificationTypeData} from '@tricordarr/libraries/Structs/SocketStructs';
import {PressAction} from '@tricordarr/libraries/Enums/Notifications';

export const TestNotificationScreen = () => {
  const theme = useAppTheme();
  const {commonStyles} = useStyles();

  return (
    <AppView>
      <ScrollingContentView>
        <PaddedContentView>
          <PrimaryActionButton
            buttonText="Display Notification"
            buttonColor={theme.colors.twitarrNeutralButton}
            onPress={() => displayTestNotification()}
            style={[commonStyles.marginTopSmall]}
          />
          <PrimaryActionButton
            buttonText="Cancel"
            buttonColor={theme.colors.twitarrNegativeButton}
            onPress={() => cancelTestNotification()}
            style={[commonStyles.marginTopSmall]}
          />
          <PrimaryActionButton
            buttonText={'Generate Event Notification'}
            onPress={() =>
              generateContentNotification(
                'ABC123',
                'Followed Event Starting',
                'Orientation is starting Soon™ in World Stage, Deck 2, Forward',
                eventChannel,
                NotificationTypeData.followedEventStarting,
                '/events/ABC123',
                // '/forumpost/mentions',
                PressAction.event,
              )
            }
            style={[commonStyles.marginTopSmall]}
          />
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};
