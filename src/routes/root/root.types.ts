import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { screenNames } from 'common/constants/screens.consts';
import { ClientTabsParamList } from '../client/client.types';

export type RootStackParamList = {
  [screenNames.client]: NavigatorScreenParams<ClientTabsParamList>;
  [screenNames.register]: undefined;
  [screenNames.login]: undefined;
  [screenNames.project]: { projectId: string };
  [screenNames.task]: { taskId: string; projectId: string };
  [screenNames.projectMembers]: { projectId: string; taskId?: string };
  [screenNames.projectMember]: { userId: string };
  [screenNames.addMember]: { projectId: string };
};

export type RootNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LoginScreen'
>;

export type ProjectRoute = RouteProp<RootStackParamList, 'ProjectScreen'>;
export type TaskRoute = RouteProp<RootStackParamList, 'TaskScreen'>;
export type MembersRoute = RouteProp<
  RootStackParamList,
  'ProjectMembersScreen'
>;
export type MemberRoute = RouteProp<RootStackParamList, 'ProjectMemberScreen'>;
export type AddMemberRoute = RouteProp<RootStackParamList, 'AddMemberScreen'>;
