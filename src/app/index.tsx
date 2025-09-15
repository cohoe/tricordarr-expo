import { AppView } from "@tricordarr/components/Views/AppView";
import { useRouter } from "expo-router";
import React from "react";
import { Text, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export const IndexScreen = () => {
  const router = useRouter();
  console.log('IndexScreen');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppView>
        <Text>Home</Text>
        <Button mode="contained" onPress={() => router.push('/about')}>About</Button>
      </AppView>
    </SafeAreaView>
  );
};

export default IndexScreen;