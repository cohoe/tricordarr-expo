import React from 'react';
import {AppIcons} from '@tricordarr/Libraries/Enums/Icons';
import {StyleProp, View, ViewStyle} from 'react-native';
import {PerformerChip} from '@tricordarr/Components/Chips/PerformerChip';
import {CommonStackComponents, useCommonStack} from '@tricordarr/Components/Navigation/CommonScreens';
import {DataFieldListItem} from '@tricordarr/Components/Lists/Items/DataFieldListItem';
import {useStyles} from '@tricordarr/Components/Context/Contexts/StyleContext';
import {PerformerHeaderData} from '@tricordarr/Libraries/Structs/ControllerStructs';

interface EventPerformerListItemProps {
  iconStyle?: StyleProp<ViewStyle>;
  itemStyle?: ViewStyle;
  performers: PerformerHeaderData[];
}

export const EventPerformerListItem = (props: EventPerformerListItemProps) => {
  const {commonStyles} = useStyles();
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
