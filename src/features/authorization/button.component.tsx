import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { TextButton } from 'src/common/components/button.component';
import { COLORS } from 'src/common/constants/colors.consts';
import { FONT_SIZES } from 'src/common/types/text.types';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, style }) => {
  return (
    <View style={[styles.wrapper, style]}>
      <TextButton
        title={title}
        size={FONT_SIZES.font20}
        onPress={onPress}
        color="background"
        style={styles.container}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 162,
    paddingVertical: 10,
    backgroundColor: COLORS.main,
    borderRadius: 21,
  },
  wrapper: {
    width: '100%',
    alignItems: 'center',
  },
});
