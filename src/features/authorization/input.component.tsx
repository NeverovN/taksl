import React, { useRef } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput as RNTextInput,
  ViewStyle,
} from 'react-native';
import { Pressable } from 'src/common/components/button.component';
import {
  TextInput,
  TextInputProps,
} from 'src/common/components/text-input.component';
import { COLORS } from 'src/common/constants/colors.consts';
import { FONT_SIZES } from 'src/common/types/text.types';

export interface AuthorizationInputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
}

export const AuthorizationInput: React.FC<AuthorizationInputProps> = ({
  style,
  containerStyle,
  ...rest
}) => {
  const ref = useRef<RNTextInput | null>(null);

  const pressHandler = () => {
    ref.current?.focus();
  };

  return (
    <Pressable
      style={[styles.inputWrapper, containerStyle]}
      onPress={pressHandler}>
      <TextInput
        ref={ref}
        size={FONT_SIZES.font16}
        style={[style]}
        placeholderTextColor={'placeholder'}
        {...rest}
      />
    </Pressable>
  );
};

export const styles = StyleSheet.create({
  inputWrapper: {
    padding: 16,
    backgroundColor: COLORS.background,
    width: '100%',
    borderRadius: 25,
  },
});
