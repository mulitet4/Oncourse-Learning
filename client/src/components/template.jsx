import { View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

const PatientChat = () => {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.primary,
      }}
    >
      <Text>Patient</Text>
    </SafeAreaView>
  );
};

export default PatientChat;
