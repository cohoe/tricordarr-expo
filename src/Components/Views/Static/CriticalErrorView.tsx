import {AppView} from '@tricordarr/Components/Views/AppView.tsx';
import {View} from 'react-native';
import {AppIcon} from '@tricordarr/Components/Icons/AppIcon.tsx';
import {AppIcons} from '@tricordarr/Libraries/Enums/Icons.ts';
import {ScrollingContentView} from '@tricordarr/Components/Views/Content/ScrollingContentView.tsx';
import React from 'react';
import {useStyles} from '@tricordarr/Components/Context/Contexts/StyleContext.ts';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView.tsx';
import {BoldText} from '@tricordarr/Components/Text/BoldText.tsx';
import {PrimaryActionButton} from '@tricordarr/Components/Buttons/PrimaryActionButton.tsx';
import {useQueryClient} from '@tanstack/react-query';
import {useAppTheme} from '@tricordarr/Styles/Theme.ts';
import {Text} from 'react-native-paper';
import {useAuth} from '@tricordarr/Components/Context/Contexts/AuthContext.ts';
import {useConfig} from '@tricordarr/Components/Context/Contexts/ConfigContext.ts';
import {getInitialAppConfig} from '@tricordarr/Libraries/AppConfig.ts';
import Clipboard from '@react-native-clipboard/clipboard';
import {HelpTopicView} from '@tricordarr/Components/Views/Help/HelpTopicView.tsx';
import {CacheManager} from '@georstat/react-native-image-cache';

interface CriticalErrorViewProps {
  error: Error;
  resetError: Function;
}

export const CriticalErrorView = (props: CriticalErrorViewProps) => {
  const {commonStyles} = useStyles();
  const theme = useAppTheme();
  const queryClient = useQueryClient();
  const [showStack, setShowStack] = React.useState(false);
  const {signOut} = useAuth();
  const {updateAppConfig, preRegistrationMode} = useConfig();

  const styles = {
    outerContainer: [commonStyles.flex, commonStyles.justifyCenter, commonStyles.alignItemsCenter],
    innerContainer: [commonStyles.justifyCenter, commonStyles.alignItemsCenter],
    contentContainer: [commonStyles.marginVerticalSmall],
  };

  const toggleShowStack = () => setShowStack(!showStack);

  const fixAll = async () => {
    await signOut(preRegistrationMode);
    queryClient.clear();
    updateAppConfig(getInitialAppConfig());
    props.resetError();
  };

  const resetAppConfig = async () => {
    updateAppConfig(getInitialAppConfig());
  };

  return (
    <AppView>
      <ScrollingContentView isStack={true} overScroll={true}>
        <View style={styles.outerContainer}>
          <PaddedContentView style={styles.innerContainer}>
            <View style={styles.contentContainer}>
              <AppIcon icon={AppIcons.error} size={150} onLongPress={toggleShowStack} />
            </View>
          </PaddedContentView>
        </View>
        <HelpTopicView>It's not you, it's me. Something has gone very wrong with this app.</HelpTopicView>
        <HelpTopicView title={'Name'}>{props.error.name}</HelpTopicView>
        <HelpTopicView title={'Message'}>{props.error.message}</HelpTopicView>
        <HelpTopicView>You can try to recover using the buttons below.</HelpTopicView>
        <PaddedContentView>
          <PrimaryActionButton
            buttonColor={theme.colors.twitarrNeutralButton}
            buttonText={'Reload'}
            onPress={() => props.resetError()}
          />
        </PaddedContentView>
        <PaddedContentView>
          <PrimaryActionButton
            buttonColor={theme.colors.twitarrNegativeButton}
            buttonText={'Clear Query Cache'}
            onPress={() => queryClient.clear()}
          />
        </PaddedContentView>
        <PaddedContentView>
          <PrimaryActionButton
            buttonColor={theme.colors.twitarrNegativeButton}
            buttonText={'Clear Image Cache'}
            onPress={async () => await CacheManager.clearCache()}
          />
        </PaddedContentView>
        <PaddedContentView>
          <PrimaryActionButton
            buttonColor={theme.colors.twitarrNegativeButton}
            buttonText={'Sign Out'}
            onPress={async () => await signOut(preRegistrationMode)}
          />
        </PaddedContentView>
        <PaddedContentView>
          <PrimaryActionButton
            buttonColor={theme.colors.twitarrNegativeButton}
            buttonText={'Reset Config'}
            onPress={resetAppConfig}
          />
        </PaddedContentView>
        <PaddedContentView>
          <PrimaryActionButton
            buttonColor={theme.colors.twitarrPositiveButton}
            buttonText={'Fix it All'}
            onPress={fixAll}
          />
        </PaddedContentView>
        {showStack && (
          <PaddedContentView>
            <BoldText>Stack Trace:</BoldText>
            <Text
              variant={'labelSmall'}
              onLongPress={() => (props.error.stack ? Clipboard.setString(props.error.stack) : undefined)}>
              {props.error.stack}
            </Text>
          </PaddedContentView>
        )}
      </ScrollingContentView>
    </AppView>
  );
};
