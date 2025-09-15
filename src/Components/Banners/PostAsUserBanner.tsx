import React from 'react';
import { Banner, Text } from 'react-native-paper';
import { usePrivilege } from '@tricordarr/components/Context/Contexts/PrivilegeContext';
import { useStyles } from '@tricordarr/components/Context/Contexts/StyleContext';
import { StyleSheet } from 'react-native';

export const PostAsUserBanner = () => {
  const { asPrivilegedUser } = usePrivilege();
  const { commonStyles } = useStyles();

  const styles = StyleSheet.create({
    banner: {
      ...commonStyles.errorContainer,
    },
    text: commonStyles.errorContainer,
  });

  return (
    <Banner visible={!!asPrivilegedUser} style={styles.banner}>
      <Text style={styles.text}>Posting as {asPrivilegedUser}</Text>
    </Banner>
  );
};
