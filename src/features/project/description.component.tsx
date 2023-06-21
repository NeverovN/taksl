import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { TextInput } from 'src/common/components/text-input.component';

export interface DescriptionProps {
  text: string;
  onChangeText: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const Description: React.FC<DescriptionProps> = ({
  text,
  onChangeText,
  style,
}) => {
  return (
    <View style={[styles.wrapper, style]}>
      <TextInput value={text} onChangeText={onChangeText} multiline />
    </View>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
});
