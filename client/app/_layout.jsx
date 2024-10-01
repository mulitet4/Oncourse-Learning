import { useEffect } from 'react';
import { Stack, SplashScreen } from 'expo-router';
import { useFonts, fontError } from 'expo-font';
import 'expo-dev-client';

import { useColorScheme } from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
``;
import merge from 'deepmerge';
import { Colors } from '../src/constants/Colors';

const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };
const customLightTheme = { ...MD3LightTheme, colors: Colors.light };

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

SplashScreen.preventAutoHideAsync();

export default function () {
  const colorScheme = useColorScheme();
  const paperTheme =
    colorScheme === 'dark' ? CombinedDarkTheme : CombinedLightTheme;

  const [fontsLoaded] = useFonts({
    Archivo: require('../assets/fonts/Archivo.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <PaperProvider theme={paperTheme}>
      <Stack>
        <Stack.Screen name='(auth)/login' options={{ headerShown: false }} />
        <Stack.Screen
          name='dashboard/index'
          options={{ headerShown: true, title: 'Dashboard' }}
        />
      </Stack>
    </PaperProvider>
  );
}
