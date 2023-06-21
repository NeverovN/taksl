import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput as RNTextInput,
  View,
  ViewStyle,
} from 'react-native';
import { TextInput } from './text-input.component';
import { IconButton } from './button.component';
import { STRINGS } from '../constants/strings.consts';
import { COLORS } from '../constants/colors.consts';

export interface MessageInputProps {
  onPress: () => void;
  value: string;
  onChangeText: (newValue: string) => void;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
}

export const MessageInput = React.forwardRef<RNTextInput, MessageInputProps>(
  ({ onPress, value, onChangeText, style, inputStyle }, ref) => {
    return (
      <View style={[styles.wrapper, style]}>
        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          placeholder={STRINGS.write}
          style={[styles.input, inputStyle]}
        />
        <IconButton onPress={onPress} name="telegram" size={24} color="title" />
      </View>
    );
  },
);

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    alignItems: 'center',
  },
  input: {
    marginRight: 16,
    borderRadius: Number.MAX_SAFE_INTEGER,
    borderWidth: 2,
    borderColor: COLORS.backgroundSecondary,
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
  },
});
