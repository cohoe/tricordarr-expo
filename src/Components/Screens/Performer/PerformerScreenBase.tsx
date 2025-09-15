import { Card, Text } from 'react-native-paper';
import { AppView } from '@tricordarr/components/Views/AppView';
import React from 'react';
import { ScrollingContentView } from '@tricordarr/components/Views/Content/ScrollingContentView';
import { RefreshControl, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { LoadingView } from '@tricordarr/components/Views/Static/LoadingView';
import { useStyles } from '@tricordarr/components/Context/Contexts/StyleContext';
import { APIImage } from '@tricordarr/components/Images/APIImage';
import { PaddedContentView } from '@tricordarr/components/Views/Content/PaddedContentView';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { LinkIconButton } from '@tricordarr/components/Buttons/IconButtons/LinkIconButton';
import { PerformerYearsCard } from '@tricordarr/components/Cards/Performer/PerformerYearsCard';
import { PerformerBioCard } from '@tricordarr/components/Cards/Performer/PerformerBioCard';
import { EventCard } from '@tricordarr/components/Cards/Schedule/EventCard';
import { CommonStackComponents, useCommonStack } from '@tricordarr/components/Navigation/CommonScreens';
import { PerformerData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { AppIcon } from '@tricordarr/components/Icons/AppIcon';

interface PerformerScreenBaseProps {
  performerData: PerformerData;
  onRefresh?: () => Promise<void>;
  isFetching?: boolean;
}

interface PerformerLinksViewProps {
  style: StyleProp<ViewStyle>;
  data: PerformerData;
}
const PerformerLinksView = (props: PerformerLinksViewProps) => {
  if (
    !props.data.website &&
    !props.data.xURL &&
    !props.data.facebookURL &&
    !props.data.instagramURL &&
    !props.data.youtubeURL
  ) {
    return <></>;
  }
  return (
    <PaddedContentView>
      <View style={props.style}>
        <LinkIconButton link={props.data.website} icon={AppIcons.webview} />
        <LinkIconButton link={props.data.xURL} icon={AppIcons.twitter} />
        <LinkIconButton link={props.data.facebookURL} icon={AppIcons.facebook} />
        <LinkIconButton link={props.data.instagramURL} icon={AppIcons.instagram} />
        <LinkIconButton link={props.data.youtubeURL} icon={AppIcons.youtube} />
      </View>
    </PaddedContentView>
  );
};

export const PerformerScreenBase = ({ performerData, onRefresh, isFetching = false }: PerformerScreenBaseProps) => {
  const { commonStyles } = useStyles();
  const navigation = useCommonStack();

  const styles = StyleSheet.create({
    image: {
      ...commonStyles.roundedBorderLarge,
      ...commonStyles.headerImage,
    },
    listContentContainer: {
      ...commonStyles.flexRow,
      ...commonStyles.justifyCenter,
    },
    eventCardContainer: {
      ...commonStyles.paddingBottomSmall,
    },
    titleContentContainer: {
      ...commonStyles.flexColumn,
      ...commonStyles.alignItemsCenter,
    },
  });

  if (!performerData) {
    return <LoadingView />;
  }

  return (
    <AppView>
      <ScrollingContentView
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={onRefresh} />}
        isStack={true}>
        <PaddedContentView style={styles.listContentContainer} padTop={true}>
          {performerData.header.photo && (
            <APIImage
              thumbPath={`/image/thumb/${performerData.header.photo}`}
              fullPath={`/image/full/${performerData.header.photo}`}
              mode={'image'}
              style={styles.image}
            />
          )}
        </PaddedContentView>
        <PaddedContentView style={styles.listContentContainer} padBottom={false}>
          <Text variant={'headlineMedium'} selectable={true}>
            {performerData.header.name}
            {performerData.header.isOfficialPerformer && (
              <>
                &nbsp;
                <AppIcon icon={AppIcons.official} />
              </>
            )}
          </Text>
        </PaddedContentView>
        <PaddedContentView style={styles.listContentContainer}>
          <Text variant={'bodyMedium'} selectable={true}>
            {performerData.pronouns}
          </Text>
        </PaddedContentView>
        {(performerData.title || performerData.organization) && (
          <PaddedContentView style={styles.listContentContainer}>
            <View style={styles.titleContentContainer}>
              {performerData.title && <Text>{performerData.title}</Text>}
              {performerData.organization && <Text>{performerData.organization}</Text>}
            </View>
          </PaddedContentView>
        )}
        {performerData.bio && (
          <PaddedContentView style={styles.listContentContainer}>
            <PerformerBioCard bio={performerData.bio} />
          </PaddedContentView>
        )}
        <PerformerLinksView style={styles.listContentContainer} data={performerData} />
        {performerData.yearsAttended.length !== 0 && (
          <PaddedContentView style={styles.listContentContainer}>
            <PerformerYearsCard years={performerData.yearsAttended} />
          </PaddedContentView>
        )}
        {performerData.events.length !== 0 && (
          <PaddedContentView>
            <Card>
              <Card.Title title={'Hosted Events'} />
              {performerData.events.map((event, index) => (
                <View key={index} style={styles.eventCardContainer}>
                  <EventCard
                    eventData={event}
                    showDay={true}
                    onPress={() => navigation.push(CommonStackComponents.eventScreen, { eventID: event.eventID })}
                  />
                </View>
              ))}
            </Card>
          </PaddedContentView>
        )}
      </ScrollingContentView>
    </AppView>
  );
};
