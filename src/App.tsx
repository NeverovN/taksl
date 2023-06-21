import React from 'react';
import { StyleSheet } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from 'routes/root/root.navigator';
import { COLORS } from 'common/constants/colors.consts';
import { Provider } from 'react-redux';
import { buildStore } from './redux/store';

export const App: React.FC = () => {
  const theme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: COLORS.background },
  };

  const store = buildStore();

  return (
    <NavigationContainer theme={theme}>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </NavigationContainer>
  );
};

export const styles = StyleSheet.create({
  appWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
