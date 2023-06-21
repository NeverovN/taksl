import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './root.types';
import { screenNames } from 'common/constants/consts';
import { options } from './root.options';
import { ClientNavigator } from '../client/client.navigator';
import { LoginScreen } from 'src/screens/login.screen';
import { RegisterScreen } from 'src/screens/register.screen';
import { ProjectScreen } from 'src/screens/project.screen';
import { TaskScreen } from 'src/screens/task.screen';
import { ProjectMembersScreen } from 'src/screens/project-members.screen';
import { MemberScreen } from 'src/screens/member.screen';
import { useSelector } from 'react-redux';
import { tokenSelector } from 'src/redux/login/auth.selectors';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const token = useSelector(tokenSelector);

  return (
    <RootStack.Navigator
      screenOptions={options}
      initialRouteName={screenNames.login}>
      {token ? (
        <RootStack.Group>
          <RootStack.Screen
            name={screenNames.client}
            component={ClientNavigator}
          />

          <RootStack.Screen
            name={screenNames.project}
            component={ProjectScreen}
          />
          <RootStack.Screen name={screenNames.task} component={TaskScreen} />
          <RootStack.Screen
            name={screenNames.projectMembers}
            component={ProjectMembersScreen}
          />
          <RootStack.Screen
            name={screenNames.projectMember}
            component={MemberScreen}
          />
        </RootStack.Group>
      ) : (
        <RootStack.Group>
          <RootStack.Screen
            name={screenNames.register}
            component={RegisterScreen}
          />
          <RootStack.Screen name={screenNames.login} component={LoginScreen} />
        </RootStack.Group>
      )}
    </RootStack.Navigator>
  );
};
