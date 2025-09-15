import { Stack } from "expo-router";
import { StyleProvider } from "@tricordarr/Components/Context/Providers/StyleProvider";
import { ThemeProvider } from "@tricordarr/Components/Context/Providers/ThemeProvider";
import { ConfigProvider } from "@tricordarr/Components/Context/Providers/ConfigProvider";

const RootLayout = () => {
  return (
    <ConfigProvider>
      <ThemeProvider>
        <StyleProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, title: 'Home' }} />
            <Stack.Screen name="about" options={{ title: 'About' }} />
          </Stack>
        </StyleProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default RootLayout;