import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
    name: "Tricordarr",
    slug: "tricordarr",
    version: "2026.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.tricordarr",
      buildNumber: "30"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.tricordarr",
      permissions: [
        "android.permission.RECEIVE_BOOT_COMPLETED",
        "android.permission.VIBRATE",
        "android.permission.WAKE_LOCK"
      ],
      versionCode: 30
    },
    notification: {
      icon: "./assets/icon.png",
      color: "#ffffff"
    },
    web: {
      favicon: "./assets/favicon.png",
      bundler: "metro"
    },
    extra: {
      eas: {
        projectId: "c09660fe-4daa-4949-93a8-a3a34cc52a92"
      }
    },
    plugins: [
      "expo-router",
      [
        "expo-notifications",
        {
          icon: "./assets/icon.png",
          color: "#ffffff"
        }
      ],
      [
        "react-native-permissions",
        {
          iosPermissions: [
            "Notifications"
          ]
        }
      ],
      [
        "expo-build-properties",
        {
          ios: {
            networkInspector: false
          }
        }
      ]
    ],
    scheme: "tricordarr"
});
