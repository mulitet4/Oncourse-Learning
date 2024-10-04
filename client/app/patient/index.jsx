import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, Button, IconButton } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { pointsActions } from '../../src/store/slices/points';

const PatientChat = () => {
  const theme = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const patients = useSelector((state) => state.patients.patients);
  const currentPoints = useSelector((state) => state.points.currentPoints);
  const currentTotalPoints = useSelector(
    (state) => state.points.currentTotalPoints
  );
  const patient = patients.patients.find((patient) => patient.id == id);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const api_url = process.env.EXPO_PUBLIC_API_URL;
  const socketRef = useRef(null);
  const [testComplete, setTestComplete] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pointsActions.resetCurrentPoints());
    dispatch(pointsActions.resetCurrentTotalPoints());
    socketRef.current = io(api_url + '/api/game');

    socketRef.current.emit('initial', patient);
    socketRef.current.emit('initial-2', patient);

    socketRef.current.on('message', (data) => {
      const _points = data.points | null;
      const _totalPoints = data.totalPoints | null;
      const { senderType, content } = data;
      setMessages((prevMessages) => [...prevMessages, { senderType, content }]);

      console.log(_points);
      console.log(_totalPoints);

      if (_points && _totalPoints) {
        dispatch(pointsActions.incrementCurrentTotalPoints(_totalPoints));
        dispatch(pointsActions.incrementCurrentPoints(_points));
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [patient]);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const message = {
      senderType: 'player',
      content: inputMessage,
    };

    if (!testComplete) {
      setTestComplete(true);
      socketRef.current.emit('test', { message: message, patient: patient });
    } else {
      setIsComplete(true);
      socketRef.current.emit('diagnosis', {
        message: message,
        patient: patient,
      });
    }

    setMessages((prevMessages) => [...prevMessages, message]);
    setInputMessage('');
  };

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
        {/* Header */}
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

        {/* Chat Messages */}
        <ScrollView tw='flex-1 flex-col px-4'>
          {messages.map((msg, index) => (
            <View key={index} tw='f'>
              {msg.senderType === 'patient' && (
                <Text tw='text-left'>{msg.content}</Text>
              )}
              {msg.senderType === 'aidoctor' && (
                <View tw='flex flex-col'>
                  <View tw='flex flex-row'>
                    <Text>🧑‍⚕️</Text>
                    <Text>AI Senior Doctor</Text>
                  </View>
                  <Text tw='text-left'>{msg.content}</Text>
                </View>
              )}
              {msg.senderType === 'player' && (
                <Text tw='text-right'>{msg.content}</Text>
              )}
            </View>
          ))}
        </ScrollView>

        {/* Input Field */}
        {!isComplete && (
          <View tw='flex flex-row items-center justify-center mb-2'>
            <TextInput
              disabled={isComplete}
              mode='outlined'
              placeholder='Enter your response'
              value={inputMessage}
              onChangeText={setInputMessage}
              tw='mx-2 flex-1 '
            />
            <IconButton
              icon={'arrow-right'}
              mode='contained'
              onPress={sendMessage}
            ></IconButton>
          </View>
        )}
        {isComplete && (
          <View>
            <Button
              onPress={() => {
                router.replace({
                  pathname: '/patient/complete',
                  params: { id: id },
                });
              }}
              mode='contained'
            >
              Complete
            </Button>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PatientChat;
