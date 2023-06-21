import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Text18 } from 'src/common/components/text.component';
import { FONT_WEIGHTS } from 'src/common/types/text.types';

export interface LinkProps {
  text: string;
  boldText: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Link: React.FC<LinkProps> = ({
  text,
  boldText,
  onPress,
  style,
}) => {
  return (
    <View style={[styles.wrapper, style]}>
      <Text18
        onPress={onPress}
        suppressHighlighting
        color="main"
        style={styles.link}>
        <Text18>{text}</Text18>{' '}
        <Text18 fontWeight={FONT_WEIGHTS.bold} color="main">
          {boldText}
        </Text18>
      </Text18>
    </View>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
  },
  link: {
    textDecorationLine: 'underline',
  },
});
