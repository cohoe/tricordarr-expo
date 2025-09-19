// DISABLED FOR EXPO-NOTIFICATIONS MIGRATION
// import notifee from '@notifee/react-native';
// import {callsChannel} from '@tricordarr/Libraries/Notifications/Channels';
// import {PressAction} from '@tricordarr/Libraries/Enums/Notifications';

/**
 * Generate a test notification.
 * DISABLED FOR EXPO-NOTIFICATIONS MIGRATION
 */
export async function displayTestNotification() {
  // DISABLED FOR EXPO-NOTIFICATIONS MIGRATION
  console.log('[TestNotification.ts] displayTestNotification() disabled for expo-notifications migration');
  return;
  /*
  await notifee.displayNotification({
    id: 'abc123',
    title: 'Jonathan Coulton',
    body: "This was a triumph. I'm making a note here: HUGE SUCCESS. It's hard to overstate my satisfaction.",
    android: {
      channelId: callsChannel.id,
      // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      autoCancel: false,
      // https://notifee.app/react-native/docs/android/interaction
      pressAction: {
        id: PressAction.default,
      },
      smallIcon: 'ic_notification',
    },
  });
  */
}

/**
 * Cancel a test notification.
 * DISABLED FOR EXPO-NOTIFICATIONS MIGRATION
 */
export async function cancelTestNotification() {
  // DISABLED FOR EXPO-NOTIFICATIONS MIGRATION
  console.log('[TestNotification.ts] cancelTestNotification() disabled for expo-notifications migration');
  return;
  /*
  await notifee.cancelNotification('abc123');
  */
}
