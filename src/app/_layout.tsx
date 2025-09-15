import { Stack } from "expo-router";
import { StyleProvider } from "@tricordarr/Components/Context/Providers/StyleProvider";
import { ThemeProvider } from "@tricordarr/Components/Context/Providers/ThemeProvider";
import { ConfigProvider } from "@tricordarr/Components/Context/Providers/ConfigProvider";
import { useStyles } from "@tricordarr/Components/Context/Contexts/StyleContext";

const ThemedStack = ({ children }: { children: React.ReactNode }) => {
  const { screenOptions } = useStyles();
  
  return (
    <Stack screenOptions={screenOptions}>
      {children}
    </Stack>
  );
};

const RootLayout = () => {
  return (
    <ConfigProvider>
      <ThemeProvider>
        <StyleProvider>
          <ThemedStack>
            <Stack.Screen name="index" options={{ headerShown: false, title: 'Home' }} />
            <Stack.Screen name="about" options={{ title: 'About' }} />
          </ThemedStack>
        </StyleProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default RootLayout;