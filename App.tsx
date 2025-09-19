import { ConfigProvider } from '@tricordarr/Components/Context/Providers/ConfigProvider';
import { StyleProvider } from '@tricordarr/Components/Context/Providers/StyleProvider';
import { ThemeProvider } from '@tricordarr/Components/Context/Providers/ThemeProvider';
import { RootStackNavigator } from '@tricordarr/Components/Navigation/Stacks/RootStackNavigator';

export default function App() {
  console.log('weeeee');
  return (
    <ConfigProvider>
      <ThemeProvider>
        <StyleProvider>
          <RootStackNavigator />
        </StyleProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
}