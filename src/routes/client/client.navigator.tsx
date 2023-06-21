import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ClientTabsParamList } from './client.types';
import { screenNames } from 'src/common/constants/screens.consts';
import { DashboardNavigator } from '../dashboard/dashboard.navigator';
import { options } from './client.options';
import { NotesScreen } from 'src/screens/notes.screen';
import { BottomTabs } from './bottom-tabs.component';
import { ICON_NAMES } from 'src/common/constants/icon-names.consts';
import { Icon } from 'src/common/components/icon.component';

const ClientTabs = createBottomTabNavigator<ClientTabsParamList>();

export const ClientNavigator: React.FC = () => {
  return (
    <ClientTabs.Navigator
      screenOptions={options}
      tabBar={props => <BottomTabs {...props} />}>
      <ClientTabs.Screen
        name={screenNames.dashboard}
        component={DashboardNavigator}
        options={{
          tabBarIcon: () => (
            <Icon name={ICON_NAMES.projects} size={24} color={'title'} />
          ),
        }}
      />
      <ClientTabs.Screen
        name={screenNames.notes}
        component={NotesScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <Icon name={ICON_NAMES.bookmark} size={size} color={'title'} />
          ),
        }}
      />
    </ClientTabs.Navigator>
  );
};
