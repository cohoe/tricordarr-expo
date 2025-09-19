// import {AndroidAction} from '@notifee/react-native'; // DISABLED FOR EXPO-NOTIFICATIONS MIGRATION

export enum fgsWorkerNotificationIDs {
  worker = 'fgsWorkerNotificationID',
  shutdown = 'fgsShutdownNotificationID',
}

export enum PressAction {
  default = 'default',
  twitarrTab = 'twitarrTab',
  worker = 'worker',
  seamail = 'seamail',
  home = 'home',
  lfg = 'lfg',
  forum = 'forum',
  krakentalk = 'krakentalk',
  event = 'event',
  contentSettings = 'contentSettings',
  personalEvent = 'personalEvent',
  markAsRead = 'markAsRead',
}

/**
 * The standard Mark As Read action. Consumed in generateContentNotification()
 * for content types that can be marked as read.
 * DISABLED FOR EXPO-NOTIFICATIONS MIGRATION
 */
export const markAsReadPressAction: any = { // Changed from AndroidAction to any for migration
  title: 'Mark as Read',
  pressAction: {
    id: PressAction.markAsRead,
  },
};

/**
 * The standard Content Settings action. Consumed in generateContentNotification()
 * for all content types.
 * DISABLED FOR EXPO-NOTIFICATIONS MIGRATION
 */
export const settingsPressAction: any = { // Changed from AndroidAction to any for migration
  title: 'Settings',
  pressAction: {
    id: PressAction.contentSettings,
  },
};
