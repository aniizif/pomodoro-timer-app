import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomePage } from '../../pages/home';
import { SettingsPage } from '../../pages/settings';
import { StatisticsPage } from '../../pages/statistics';

const Stack = createNativeStackNavigator();

export const withNavigation = (component) => () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsPage}
        options={{ title: 'Настройки' }}
      />
      <Stack.Screen
        name="Statistics"
        component={StatisticsPage}
        options={{ title: 'Статистика' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);