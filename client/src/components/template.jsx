import { View, useColorScheme } from 'react-native';
import { Colors } from '../../../src/constants/Colors';
import { useAppContext } from '../../../src/providers/authProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';

const PatientAdd = () => {
  const colorScheme = useColorScheme();
  const { isOffline, accessMode } = useAppContext();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          colorScheme == 'dark'
            ? Colors.dark.background
            : Colors.light.background,
      }}
    >
      <Text>Patient</Text>
    </SafeAreaView>
  );
};

export default PatientAdd;
