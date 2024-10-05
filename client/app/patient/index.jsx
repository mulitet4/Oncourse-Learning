import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Text,
  TextInput,
  Button,
  IconButton,
  Surface,
} from 'react-native-paper';
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

  const labPoints = useSelector((state) => state.points.labPoints);
  const labTotalPoints = useSelector((state) => state.points.labTotalPoints);
  const diagnosisPoints = useSelector((state) => state.points.diagnosisPoints);
  const diagnosisTotalPoints = useSelector(
    (state) => state.points.diagnosisTotalPoints
  );

  const patient = patients.patients.find((patient) => patient.id == id);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const api_url = process.env.EXPO_PUBLIC_API_URL;
  // const api_url = '';
  const socketRef = useRef(null);
  const [testComplete, setTestComplete] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pointsActions.resetAllPoints());
    socketRef.current = io(api_url + '/api/game');

    socketRef.current.emit('initial', patient);

    socketRef.current.on('initialResponse', () => {
      socketRef.current.emit('initial-2', patient);
    });

    socketRef.current.on('testComplete', (data) => {
      console.log(typeof data.points);
      console.log(data);
      _points = Number(data.points);
      _totalPoints = Number(data.totalPoints);
      dispatch(pointsActions.addLabPoints(_points));
      dispatch(pointsActions.addLabTotalPoints(_totalPoints));
      setTestComplete(true);
    });

    socketRef.current.on('diagnosisComplete', (data) => {
      _points = Number(data.points);
      _totalPoints = Number(data.totalPoints);
      dispatch(pointsActions.addDiagnosisPoints(_points));
      dispatch(pointsActions.addDiagnosisTotalPoints(_totalPoints));
      setIsComplete(true);
    });

    socketRef.current.on(
      'message',
      (data) => {
        const { senderType, content } = data;
        setMessages((prevMessages) => [
          ...prevMessages,
          { senderType, content },
        ]);
      },
      []
    );

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
      socketRef.current.emit('test', { message: message, patient: patient });
    } else {
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
              {labPoints + diagnosisPoints}/
              {labTotalPoints + diagnosisTotalPoints} points
            </Text>
          </View>
        </View>

        {/* Chat Messages */}
        <ScrollView tw='flex-1 flex-col px-4'>
          {messages.map((msg, index) => (
            <View key={index} tw='f'>
              {msg.senderType === 'patient' && (
                <Text variant='bodyLarge' tw='text-left w-10/12'>
                  {msg.content}
                </Text>
              )}

              {msg.senderType === 'aidoctor' && (
                <View tw='flex flex-col mt-8 w-10/12'>
                  <View tw='flex flex-row items-center space-x-2 mb-4'>
                    <View
                      style={{ backgroundColor: theme.colors.tertiary }}
                      tw='p-2 rounded-md flex items-start'
                    >
                      <Text tw='translate-y-2.5' variant='titleLarge'>
                        🧑‍⚕️
                      </Text>
                    </View>
                    <Text variant='titleMedium'>AI Senior Doctor</Text>
                    {testComplete && !isComplete && (
                      <View
                        tw='rounded-xl px-2 py-1'
                        style={{ backgroundColor: theme.colors.secondary }}
                      >
                        <Text>
                          {labPoints}/{labTotalPoints} points
                        </Text>
                      </View>
                    )}
                    {isComplete && (
                      <View
                        tw='rounded-full px-2 py-1'
                        style={{ backgroundColor: theme.colors.secondary }}
                      >
                        <Text>
                          {diagnosisPoints}/{diagnosisTotalPoints} points
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text variant='bodyLarge' tw='text-left'>
                    {msg.content}
                  </Text>
                </View>
              )}

              {msg.senderType === 'player' && (
                <View tw='flex flex-col mt-8 items-end'>
                  <View tw='flex flex-row items-center space-x-2 mb-4'>
                    <Text variant='titleMedium'>You</Text>
                    <View
                      style={{ backgroundColor: theme.colors.primary }}
                      tw='p-2 rounded-md flex items-end'
                    >
                      <Text tw='translate-y-2.5' variant='titleLarge'>
                        🧑‍⚕️
                      </Text>
                    </View>
                  </View>
                  <Text variant='bodyLarge' tw='text-right'>
                    {msg.content}
                  </Text>
                </View>
              )}
            </View>
          ))}

          <View tw='h-24'></View>
        </ScrollView>

        {/* Input Field */}
        {!isComplete && (
          <View tw='flex flex-row items-center justify-center mb-2 ml-3 space-x-2 h-14'>
            <Surface elevation={1} style={{ borderRadius: 7 }} tw='flex-1'>
              <TextInput
                disabled={isComplete}
                mode='outlined'
                placeholder='Enter your response'
                value={inputMessage}
                onChangeText={setInputMessage}
                placeholderTextColor={'#555555'}
                contentStyle={{
                  paddingVertical: 10,
                }}
                outlineStyle={{
                  borderRadius: 7,
                  borderWidth: 1,
                  borderColor: '#eeeeee',
                }}
                tw='flex-1 border-none'
              />
            </Surface>

            <IconButton
              icon='send'
              iconColor='white'
              style={{
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                width: 50,
                backgroundColor: theme.colors.primary,
              }}
              onPress={sendMessage}
              mode='contained'
            ></IconButton>
          </View>
        )}
        {isComplete && (
          <View
            style={{
              height: 53,
              backgroundColor: theme.colors.onPrimary,
            }}
            tw='m-3 rounded-lg'
          >
            <Button
              tw='rounded-lg h-12 pt-1'
              onPress={() => {
                router.replace({
                  pathname: '/patient/complete',
                  params: { id: id },
                });
              }}
              contentStyle={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              mode='contained'
            >
              <Text
                tw='font-bold'
                variant='bodyLarge'
                style={{ color: theme.colors.text }}
              >
                COMPLETE
              </Text>
            </Button>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PatientChat;
