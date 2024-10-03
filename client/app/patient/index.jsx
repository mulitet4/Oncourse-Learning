import { View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';

const PatientChat = () => {
  const theme = useTheme();
  const { id } = useLocalSearchParams();
  const patients = useSelector((state) => state.patients.patients);
  const currentPoints = useSelector((state) => state.points.currentPoints);
  const currentTotalPoints = useSelector(
    (state) => state.points.currentTotalPoints
  );
  const currentPatient = patients.patients.find((patient) => patient.id == id);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.primary,
      }}
    >
      <View
        style={{
          backgroundColor: theme.colors.background,
          height: '100%',
        }}
      >
        <View
          tw='rounded-b-md p-4 pt-16 mb-3 flex flex-row justify-between'
          style={{
            backgroundColor: theme.colors.primary,
          }}
          id='Title'
        >
          <Text
            variant='titleLarge'
            tw='font-bold'
            style={{ color: theme.colors.text }}
          >
            Welcome
          </Text>
          <View
            style={{ backgroundColor: theme.colors.secondary }}
            tw='flex flex-row rounded-full py-1 px-3'
          >
            <Text variant='titleMedium' style={{ color: theme.colors.text }}>
              {currentPoints}/{currentTotalPoints} points
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PatientChat;
