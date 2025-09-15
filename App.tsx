import { Text, View } from 'react-native';
import "expo-router/entry";
import { ExpoRoot } from 'expo-router';

export default function App() {
  console.log('weeeee');
  const ctx = require.context("./src/app");
  return (
    <View>
      <Text>Hello world!</Text>
      <ExpoRoot context={ctx} />
    </View>
  );
}