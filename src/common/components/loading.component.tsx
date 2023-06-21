import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton } from './button.component';
import { GIFS } from '../constants/gifs.consts';
import FastImage from 'react-native-fast-image';
import { ICON_NAMES } from '../constants/icon-names.consts';

export interface LoadingProps {
  withBack?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ withBack }) => {
  const navigation = useNavigation();

  const backPressHandler = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  return (
    <SafeAreaView style={styles.wrapper} pointerEvents="box-none">
      {withBack && (
        <IconButton
          name={ICON_NAMES['carret-left']}
          onPress={backPressHandler}
          style={styles.backButton}
          color={'title'}
          size={24}
        />
      )}
      <SafeAreaView style={styles.screen}>
        <FastImage style={styles.spinner} source={GIFS.loading} />
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
    padding: 16,
  },
  spinner: {
    height: 40,
    width: 40,
  },
});
