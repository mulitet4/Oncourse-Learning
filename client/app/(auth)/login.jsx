import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { useColorScheme, View } from 'react-native';
import { Avatar, Button, Card, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const LeftContent = (props) => <Avatar.Icon {...props} icon='folder' />;

import { Colors } from '../../src/constants/Colors';

export default function Login() {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView
      tw='flex-1 p-4'
      style={{
        backgroundColor:
          colorScheme == 'dark'
            ? Colors.dark.background
            : Colors.light.background,
      }}
    >
      <View tw='flex-1 flex-col'>
        <Text tw='text-center my-24' variant='displayLarge'>
          Optal
        </Text>
        <TextInput
          mode='outlined'
          label='Phone Number'
          value={phone}
          keyboardType='number-pad'
          onChangeText={(text) => setPhone(text)}
        />

        <TextInput
          tw='mt-4'
          mode='outlined'
          label='Password'
          value={password}
          keyboardType='visible-password'
          onChangeText={(text) => setPassword(text)}
        />

        <Button
          tw='mt-8 p-1'
          rippleColor='#FFFFFF20'
          icon='check'
          mode='contained'
          onPress={() => console.log('Pressed')}
        >
          Login
        </Button>

        <Button
          tw='mt-4 p-1'
          rippleColor='#FFFFFF20'
          icon='check'
          mode='contained'
          onPress={() => console.log('Pressed')}
        >
          Offline
        </Button>
      </View>
    </SafeAreaView>
  );
}
