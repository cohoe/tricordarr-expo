import React from 'react';
import {SnackBarBase, SnackBarBaseProps} from '@tricordarr/Components/Snackbars/SnackBarBase';
import {StyleSheet} from 'react-native';
import {useStyles} from '@tricordarr/Components/Context/Contexts/StyleContext.ts';

export const ImageViewerSnackbar = ({
  setMessage,
  message,
  duration = 4000,
  messagePrefix = '✅ ',
}: SnackBarBaseProps) => {
  const {styleDefaults} = useStyles();
  const styles = StyleSheet.create({
    snackbar: {
      marginBottom: styleDefaults.marginSize * 5,
    },
  });
  return (
    <SnackBarBase
      style={styles.snackbar}
      message={message}
      setMessage={setMessage}
      messagePrefix={messagePrefix}
      duration={duration}
      elevation={0}
    />
  );
};
