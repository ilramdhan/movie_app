import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import MovieDetail from '../screens/MovieDetail';
import { useTheme } from 'styled-components/native';

const Stack = createNativeStackNavigator();

export default function HomeStackNavigation(): JSX.Element {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="MainHome" component={Home} options={{ title: 'Home' }} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} options={{ title: 'Movie Detail' }} />
    </Stack.Navigator>
  );
}
