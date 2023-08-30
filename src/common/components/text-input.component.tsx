import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { FONT_SIZES, FONT_WEIGHTS } from '../types/text.types';
import { Color } from '../types/color.types';
import { COLORS } from '../constants/colors.consts';

export interface TextInputProps
  extends Omit<RNTextInputProps, 'placeholderTextColor'> {
  fontWeight?: FONT_WEIGHTS;
  size?: FONT_SIZES;
  color?: Color;
  placeholderTextColor?: Color;
}

export const TextInput = React.forwardRef<RNTextInput, TextInputProps>(
  (
    {
      fontWeight = FONT_WEIGHTS.regular,
      size = FONT_SIZES.font18,
      style,
      color = 'input',
      placeholderTextColor = 'placeholder',
      ...rest
    },
    ref,
  ) => {
    return (
      <RNTextInput
        ref={ref}
        autoCapitalize="none"
        placeholderTextColor={COLORS[placeholderTextColor]}
        style={[
          // eslint-disable-next-line react-native/no-inline-styles
          { padding: 0 },
          style,
          { fontFamily: fontWeight, fontSize: size, color: COLORS[color] },
        ]}
        {...rest}
      />
    );
  },
);
