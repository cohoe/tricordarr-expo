import {AppView} from '@tricordarr/Components/Views/AppView';
import {ScrollingContentView} from '@tricordarr/Components/Views/Content/ScrollingContentView';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView';
import {ListTitleView} from '@tricordarr/Components/Views/ListTitleView';
import {useTimeZoneChangesQuery} from '@tricordarr/Queries/Admin/TimeZoneQueries';
import {LoadingView} from '@tricordarr/Components/Views/Static/LoadingView';
import {RefreshControl, Linking, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {PrimaryActionButton} from '@tricordarr/Components/Buttons/PrimaryActionButton';
import {TimeZoneChangeRecord} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {DataTable, Text} from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {MaterialHeaderButton} from '@tricordarr/Components/Buttons/MaterialHeaderButton';
import {AppIcons} from '@tricordarr/Libraries/Enums/Icons';
import {CommonStackComponents, useCommonStack} from '@tricordarr/Components/Navigation/CommonScreens';
import moment from 'moment-timezone';
import {useStyles} from '@tricordarr/Components/Context/Contexts/StyleContext';
import {useUserNotificationDataQuery} from '@tricordarr/Queries/Alert/NotificationQueries';
import {DataTableCell} from '@tricordarr/Components/Tables/DataTableCell';

const getCleanISOString = (dateString: string): string => {
  return new Date(dateString).toISOString().split('.')[0] + 'Z';
};

const TimeZoneListItem = ({record}: {record: TimeZoneChangeRecord}) => {
  const [showID, setShowID] = useState(false);
  const {commonStyles} = useStyles();
  return (
    <DataTable.Row>
      <DataTableCell value={getCleanISOString(record.activeDate)} />
      <DataTable.Cell
        onPress={() => setShowID(!showID)}
        onLongPress={() => Clipboard.setString(record.timeZoneID)}
        style={commonStyles.paddingVerticalTiny}>
        <Text>
          {record.timeZoneID}
          {'\n'}
          {record.timeZoneAbbrev} (UTC{moment.tz(record.timeZoneID).utcOffset()})
        </Text>
      </DataTable.Cell>
    </DataTable.Row>
  );
};

export const MainTimeZoneScreen = () => {
  const {data, refetch, isFetching, isInitialLoading} = useTimeZoneChangesQuery();
  const navigation = useCommonStack();
  const {data: notificationData, refetch: refetchNotificationData} = useUserNotificationDataQuery();

  const refresh = async () => {
    await Promise.all([refetch(), refetchNotificationData()]);
  };

  const getNavBarIcons = useCallback(
    () => (
      <View>
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <Item
            title={'Help'}
            iconName={AppIcons.help}
            onPress={() => navigation.push(CommonStackComponents.timeZoneHelpScreen)}
          />
        </HeaderButtons>
      </View>
    ),
    [navigation],
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: getNavBarIcons,
    });
  }, [getNavBarIcons, navigation]);

  if (isInitialLoading) {
    return <LoadingView />;
  }

  return (
    <AppView>
      <ScrollingContentView
        isStack={true}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refresh} />}>
        <ListTitleView title={'Check Device Time'} />
        <PaddedContentView padTop={true}>
          <Text>
            You can compare your device time to the server with the button below. Remember that if there is a
            discrepancy between the ship clocks and Twitarr, the ship clocks are always right and Twitarr is wrong.
          </Text>
        </PaddedContentView>
        <PaddedContentView>
          <PrimaryActionButton
            buttonText={'Check Device Time'}
            onPress={() => Linking.openURL(`tricordarr://twitarrtab/${Date.now()}/time`)}
          />
        </PaddedContentView>
        <ListTitleView title={'Time Zone Changes'} />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Effective Date (UTC)</DataTable.Title>
            <DataTable.Title>Details</DataTable.Title>
          </DataTable.Header>
          {data?.records.map((record, index) => {
            return <TimeZoneListItem key={index} record={record} />;
          })}
        </DataTable>
        {notificationData && (
          <>
            <ListTitleView title={'Server Time Information'} />
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell>Time</DataTable.Cell>
                <DataTableCell value={notificationData.serverTime} />
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Time Zone ID</DataTable.Cell>
                <DataTableCell value={notificationData.serverTimeZoneID} />
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Time Zone Abbreviation</DataTable.Cell>
                <DataTableCell value={notificationData.serverTimeZone} />
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>UTC Offset</DataTable.Cell>
                <DataTableCell value={notificationData.serverTimeOffset / 60} />
              </DataTable.Row>
            </DataTable>
          </>
        )}
      </ScrollingContentView>
    </AppView>
  );
};
