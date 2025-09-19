import {AppView} from '@tricordarr/../Views/AppView.tsx';
import React from 'react';
import {ScrollingContentView} from '@tricordarr/../Views/Content/ScrollingContentView.tsx';
import {PaddedContentView} from '@tricordarr/../Views/Content/PaddedContentView.tsx';
import {Formik} from 'formik';
import {View} from 'react-native';
import {ListSubheader} from '@tricordarr/../Lists/ListSubheader.tsx';
import {ListSection} from '@tricordarr/../Lists/ListSection.tsx';
import {contentNotificationCategories} from '@tricordarr/../../Libraries/Notifications/Content.ts';
import {BooleanField} from '@tricordarr/../Forms/Fields/BooleanField.tsx';
import {useConfig} from '@tricordarr/../Context/Contexts/ConfigContext.ts';
import {useStyles} from '@tricordarr/../Context/Contexts/StyleContext.ts';
import {PushNotificationConfig} from '@tricordarr/../../Libraries/AppConfig.ts';

export const SeamailSettingsScreen = () => {
  const {appConfig, hasNotificationPermission, updateAppConfig} = useConfig();
  const {commonStyles} = useStyles();

  const toggleValue = (configKey: keyof PushNotificationConfig) => {
    let pushConfig = appConfig.pushNotifications;
    // https://bobbyhadz.com/blog/typescript-cannot-assign-to-because-it-is-read-only-property
    (pushConfig[configKey] as boolean) = !appConfig.pushNotifications[configKey];
    updateAppConfig({
      ...appConfig,
      pushNotifications: pushConfig,
    });
  };

  return (
    <AppView>
      <ScrollingContentView isStack={true}>
        <PaddedContentView padSides={false}>
          <Formik initialValues={{}} onSubmit={() => {}}>
            <View>
              <ListSection>
                <ListSubheader>Push Notifications</ListSubheader>
                <BooleanField
                  key={contentNotificationCategories.seamailUnreadMsg.configKey}
                  name={contentNotificationCategories.seamailUnreadMsg.configKey}
                  label={contentNotificationCategories.seamailUnreadMsg.title}
                  value={appConfig.pushNotifications.forumMention}
                  onPress={() => toggleValue(contentNotificationCategories.forumMention.configKey)}
                  disabled={!hasNotificationPermission}
                  helperText={contentNotificationCategories.forumMention.description}
                  style={commonStyles.paddingHorizontal}
                />
              </ListSection>
            </View>
          </Formik>
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};
