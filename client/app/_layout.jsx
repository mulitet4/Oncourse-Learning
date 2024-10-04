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
  configureFonts,
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

import { Provider } from 'react-redux';
import store from '../src/store/store';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const paperTheme = CombinedLightTheme;

  const [fontsLoaded] = useFonts({
    Rubik: require('../assets/fonts/Rubik.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const fonts = configureFonts({
    config: {
      fontFamily: 'Rubik',
    },
  });

  return (
    <PaperProvider theme={{ ...paperTheme, fonts }}>
      <Provider store={store}>
        <Stack>
          <Stack.Screen name='dashboard' options={{ headerShown: false }} />
          <Stack.Screen name='patient' options={{ headerShown: false }} />
        </Stack>
      </Provider>
    </PaperProvider>
  );
}
