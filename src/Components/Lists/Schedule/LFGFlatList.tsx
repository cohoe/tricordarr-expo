import { FezData } from '@tricordarr/libraries/Structs/ControllerStructs';
import React, { ReactElement, useCallback } from 'react';
import { RefreshControlProps } from 'react-native';
import { CommonStackComponents } from '@tricordarr/components/Navigation/CommonScreens';
import { useLFGStackNavigation } from '@tricordarr/components/Navigation/Stacks/LFGStackNavigator';
import { ScheduleFlatListBase } from '@tricordarr/components/Lists/Schedule/ScheduleFlatListBase';
import { ScheduleFlatListSeparator } from '@tricordarr/libraries/Types/index';
import { FlashList } from '@shopify/flash-list';
import { FezCard } from '@tricordarr/components/Cards/Schedule/FezCard';
import { FezType } from '@tricordarr/libraries/Enums/FezType';

interface LFGFlatListProps {
  items: FezData[];
  refreshControl?: React.ReactElement<RefreshControlProps>;
  listRef: React.RefObject<FlashList<FezData>>;
  separator?: ScheduleFlatListSeparator;
  listHeader?: ReactElement;
  listFooter?: ReactElement;
  initialScrollIndex?: number;
  onScrollThreshold?: (condition: boolean) => void;
  hasNextPage?: boolean;
  handleLoadPrevious?: () => void;
  handleLoadNext?: () => void;
  renderItem?: ({ item }: { item: FezData; }) => React.JSX.Element;
  enableReportOnly?: boolean;
}

export const LFGFlatList = ({
  items,
  refreshControl,
  separator = 'day',
  listRef,
  onScrollThreshold,
  handleLoadNext,
  handleLoadPrevious,
  hasNextPage,
  renderItem,
  enableReportOnly,
  listHeader,
}: LFGFlatListProps) => {
  const navigation = useLFGStackNavigation();

  const renderItemDefault = useCallback(
    ({ item }: { item: FezData; }) => {
      return (
        <FezCard
          fez={item}
          showDay={true}
          onPress={() => {
            if (FezType.isLFGType(item.fezType)) {
              navigation.push(CommonStackComponents.lfgScreen, { fezID: item.fezID });
            } else if (FezType.isPrivateEventType(item.fezType)) {
              navigation.push(CommonStackComponents.personalEventScreen, { eventID: item.fezID });
            }
          }}
          enableReportOnly={enableReportOnly}
        />
      );
    },
    [navigation, enableReportOnly],
  );

  const keyExtractor = useCallback((item: FezData) => item.fezID, []);

  return (
    <ScheduleFlatListBase
      listRef={listRef}
      keyExtractor={keyExtractor}
      items={items}
      renderItem={renderItem || renderItemDefault}
      separator={separator}
      refreshControl={refreshControl}
      onScrollThreshold={onScrollThreshold}
      handleLoadNext={handleLoadNext}
      handleLoadPrevious={handleLoadPrevious}
      hasNextPage={hasNextPage}
      estimatedItemSize={161}
      listHeader={listHeader}
    />
  );
};
