import {View} from 'react-native';
import React from 'react';
import {useStyles} from '@tricordarr/components/Context/Contexts/StyleContext';

export const MessageSpacerView = () => {
  const {commonStyles} = useStyles();
  const styles = [
    commonStyles.spacerWidth,
    // {backgroundColor: 'red'},
  ];
  return <View style={styles} />;
};
