import { Text, Platform } from 'react-native';
import { Link, Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return <Redirect href='dashboard' />;
}
