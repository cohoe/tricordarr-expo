import React, { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

interface AppViewProps extends PropsWithChildren {}

export const AppView = ({children}: AppViewProps) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0000ff'
    },
  });
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};