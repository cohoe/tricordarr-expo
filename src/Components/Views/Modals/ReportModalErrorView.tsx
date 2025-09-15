import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {useStyles} from '@tricordarr/components/Context/Contexts/StyleContext';
import {ModalCard} from '@tricordarr/components/Cards/ModalCard';

export const ReportModalErrorView = () => {
  const {commonStyles} = useStyles();

  return (
    <View>
      <ModalCard
        title={'Report'}
        content={
          <Text style={[commonStyles.marginBottomSmall]}>
            Something has gone wrong! Please message TwitarrTeam for assistance.
          </Text>
        }
      />
    </View>
  );
};
