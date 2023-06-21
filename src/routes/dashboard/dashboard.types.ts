import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { screenNames } from 'common/constants/screens.consts';

export type DashboardStackParamList = {
  [screenNames.home]: undefined;
  [screenNames.settings]: undefined;
};

export type DashboardNavigationProp = NativeStackNavigationProp<
  DashboardStackParamList,
  'HomeScreen'
>;
