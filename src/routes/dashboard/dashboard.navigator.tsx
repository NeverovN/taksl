import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardStackParamList } from './dashboard.types';
import { screenNames } from 'common/constants/consts';
import { options } from './dashboard.options';
import { HomeScreen } from 'src/screens/home.screen';
import { SettingsScreen } from 'src/screens/settings.screen';

const DashboardStack = createNativeStackNavigator<DashboardStackParamList>();

export const DashboardNavigator = () => {
  return (
    <DashboardStack.Navigator screenOptions={options}>
      <DashboardStack.Screen name={screenNames.home} component={HomeScreen} />
      <DashboardStack.Screen
        name={screenNames.settings}
        component={SettingsScreen}
      />
    </DashboardStack.Navigator>
  );
};
