import { View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useLocalSearchParams, useRouter } from 'expo-router';

const Complete = () => {
  const router = useRouter();
  const theme = useTheme();
  const { id } = useLocalSearchParams();
  const patients = useSelector((state) => state.patients.patients);
  const patient = patients.patients.find((patient) => patient.id == id);
  const currentPoints = useSelector((state) => state.points.currentPoints);
  const currentTotalPoints = useSelector(
    (state) => state.points.currentTotalPoints
  );

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
          <View tw='flex flex-row items-center space-x-3'>
            <View
              style={{ backgroundColor: theme.colors.background }}
              tw='rounded-md p-2'
            >
              <Text style={{ color: theme.colors.text }} variant='titleLarge'>
                {patient.gender == 'Male' ? '🧑' : '👩'}
              </Text>
            </View>
            <Text variant='titleMedium' style={{ color: theme.colors.text }}>
              {patient.gender == 'Male' ? 'MR. AMIT' : 'MRS. NIKITA'} (
              {patient.age} Y/O)
            </Text>
          </View>

          <View
            style={{ backgroundColor: theme.colors.secondary }}
            tw='flex flex-row rounded-full px-3 items-center justify-center'
          >
            <Text variant='titleMedium' style={{ color: theme.colors.text }}>
              {currentPoints}/{currentTotalPoints} points
            </Text>
          </View>
        </View>

        <View tw='flex-1 flex flex-col items-center justify-center'>
          <Text tw='font-semibold' variant='titleMedium'>
            Your Score
          </Text>
          <Text tw='mt-2 font-medium' variant='displaySmall'>
            {currentPoints}/{currentTotalPoints} Points
          </Text>
          <View tw='mt-8 flex flex-row space-x-12'>
            <View>
              <Text>LAB TEST</Text>
            </View>
            <View>
              <Text>DIAGNOSIS</Text>
            </View>
          </View>
        </View>

        <View>
          <Button
            tw='mx-4 mb-4'
            onPress={() => {
              router.back();
            }}
            mode='contained'
          >
            Back
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Complete;
