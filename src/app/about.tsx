import { AppView } from "@tricordarr/components/Views/AppView";
import { useRouter } from "expo-router";
import React from "react";
import { Text, Button } from "react-native-paper";

export const AboutTricordarrScreen = () => {
  const router = useRouter();
  return (
    <AppView>
      <Text>About Tricordarr</Text>
    </AppView>
  );
};

export default AboutTricordarrScreen;