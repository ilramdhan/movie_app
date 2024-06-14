import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import HomeStackNavigation from './HomeStackNavigation';
import Search from '../screens/Search';
import Favorite from '../screens/Favorite';
import { useTheme } from 'styled-components/native';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = (): JSX.Element => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }: { color: string; size: number }) => {
          let iconName: keyof typeof Feather.glyphMap = 'home'; // default value

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Favorite') {
            iconName = 'heart';
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigation} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Favorite" component={Favorite} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
