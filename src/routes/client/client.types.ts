import { NavigatorScreenParams } from '@react-navigation/native';
import { screenNames } from 'src/common/constants/screens.consts';
import { DashboardStackParamList } from '../dashboard/dashboard.types';

export type ClientTabsParamList = {
  [screenNames.dashboard]: NavigatorScreenParams<DashboardStackParamList>;
  [screenNames.notes]: undefined;
};
