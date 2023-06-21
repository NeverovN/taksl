import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PressableOpacity } from './button.component';
import { COLORS } from '../constants/colors.consts';
import { Text24, Text40 } from './text.component';

export interface ErrorProps {
  withBack?: boolean;
  error: Error;
}

export const Error: React.FC<ErrorProps> = ({ withBack, error }) => {
  const navigation = useNavigation();

  const backPressHandler = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.wrapper} pointerEvents="box-none">
      {withBack && (
        <PressableOpacity
          onPress={backPressHandler}
          style={styles.backButton}
        />
      )}
      <SafeAreaView style={styles.screen}>
        <Text40>Error Occurred</Text40>
        <Text24>{error.message}</Text24>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    marginLeft: 16,
    height: 24,
    width: 24,
    backgroundColor: COLORS.main,
  },
  spinner: {
    height: 40,
    width: 40,
  },
});
