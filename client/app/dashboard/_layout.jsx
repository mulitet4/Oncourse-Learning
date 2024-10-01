import { Stack } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name='/index' />
    </Stack>
  );
};

export default _layout;
