import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View } from 'react-native';
import {
  useTheme,
  Text,
  Button,
  Card,
  Avatar,
  ActivityIndicator,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { patientsActions } from '../../src/store/slices/patients';

const index = () => {
  const router = useRouter();
  const theme = useTheme();
  const patients = useSelector((state) => state.patients.patients);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  async function init() {
    // Using ngrok
    const data = await fetch(process.env.EXPO_PUBLIC_API_URL + '/api/patients');
    dispatch(patientsActions.setPatients(await data.json()));
    setLoading(false);
  }

  useEffect(() => {
    init();
  }, []);

  if (loading)
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
        tw='flex items-center justify-center'
      >
        <ActivityIndicator></ActivityIndicator>
      </SafeAreaView>
    );

  return (
    <SafeAreaView
      style={{
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
          tw='rounded-b-xl p-4 pt-8 mb-3 flex flex-row justify-between'
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
            Choose your next case!
          </Text>
        </View>
        <ScrollView tw='px-3 pb-3 space-y-2'>
          {patients.patients.map((patient) => {
            return (
              <View
                tw='pb-2 rounded-xl'
                style={{ backgroundColor: theme.colors.onPrimary }}
                key={patient.id}
              >
                <Card
                  onPress={() => {
                    router.push({
                      pathname: '/patient',
                      params: { id: patient.id },
                    });
                  }}
                  style={{ backgroundColor: theme.colors.primary }}
                >
                  <Card.Content>
                    <View tw='flex flex-row space-x-3 items-center'>
                      <View
                        style={{ backgroundColor: theme.colors.background }}
                        tw='rounded-xl p-2'
                      >
                        <Text
                          style={{ color: theme.colors.text }}
                          variant='titleLarge'
                        >
                          {patient.gender == 'Male' ? '🧑' : '👩'}
                        </Text>
                      </View>
                      <Text
                        style={{ color: theme.colors.text }}
                        variant='titleLarge'
                      >
                        {patient.age + ' y/o'}
                      </Text>
                    </View>
                    <View tw='mt-2 space-y-1'>
                      <Text
                        style={{ color: theme.colors.text }}
                        variant='bodyMedium'
                      >
                        Gender: {patient.gender}
                      </Text>
                      <Text
                        style={{ color: theme.colors.text }}
                        variant='bodyMedium'
                      >
                        Symptoms: {patient.symptoms}
                      </Text>
                      <Text
                        style={{ color: theme.colors.text }}
                        variant='bodyMedium'
                      >
                        History: {patient.history}
                      </Text>
                    </View>
                  </Card.Content>
                </Card>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default index;
