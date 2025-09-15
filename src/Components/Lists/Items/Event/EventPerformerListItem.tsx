import React from 'react';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { StyleProp, View, ViewStyle } from 'react-native';
import { PerformerChip } from '@tricordarr/components/Chips/PerformerChip';
import { CommonStackComponents, useCommonStack } from '@tricordarr/components/Navigation/CommonScreens';
import { DataFieldListItem } from '@tricordarr/components/Lists/Items/DataFieldListItem';
import { useStyles } from '@tricordarr/components/Context/Contexts/StyleContext';
import { PerformerHeaderData } from '@tricordarr/libraries/Structs/ControllerStructs';

interface EventPerformerListItemProps {
  iconStyle?: StyleProp<ViewStyle>;
  itemStyle?: ViewStyle;
  performers: PerformerHeaderData[];
}

export const EventPerformerListItem = (props: EventPerformerListItemProps) => {
  const { commonStyles } = useStyles();
  const navigation = useCommonStack();

  const getDescription = () => {
    return (
      <View style={commonStyles.chipContainer}>
        {props.performers.map((performer, index) => {
          return (
            <PerformerChip
              key={index}
              performerHeader={performer}
              onPress={() => {
                if (performer.id) {
                  navigation.push(CommonStackComponents.performerScreen, {
                    id: performer.id,
                  });
                }
              }}
            />
          );
        })}
      </View>
    );
  };

  return (
    <DataFieldListItem
      itemStyle={props.itemStyle}
      icon={AppIcons.performer}
      title={'Featuring'}
      description={getDescription}
    />
  );
};
