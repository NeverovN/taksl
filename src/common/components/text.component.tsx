import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { FONT_SIZES, FONT_WEIGHTS } from '../types/text.types';
import { Color } from '../types/color.types';
import { COLORS } from '../constants/consts';

export interface CustomTextProps {
  fontWeight?: FONT_WEIGHTS;
  size?: FONT_SIZES;
  color?: Color;
}

export interface TextProps extends RNTextProps, CustomTextProps {}

export const Text: React.FC<TextProps> = ({
  size = FONT_SIZES.font14,
  fontWeight = FONT_WEIGHTS.regular,
  color = 'main',
  style,
  ...rest
}) => {
  return (
    <RNText
      style={[
        { fontSize: size, color: COLORS[color], fontFamily: fontWeight },
        style,
      ]}
      {...rest}
    />
  );
};

export const Text40: React.FC<TextProps> = ({ ...rest }) => {
  return <Text {...rest} size={FONT_SIZES.font40} />;
};

export const Text24: React.FC<TextProps> = ({ ...rest }) => {
  return <Text {...rest} size={FONT_SIZES.font24} />;
};

export const Text22: React.FC<TextProps> = ({ ...rest }) => {
  return <Text {...rest} size={FONT_SIZES.font22} />;
};

export const Text20: React.FC<TextProps> = ({ ...rest }) => {
  return <Text {...rest} size={FONT_SIZES.font20} />;
};

export const Text18: React.FC<TextProps> = ({ ...rest }) => {
  return <Text {...rest} size={FONT_SIZES.font18} />;
};

export const Text16: React.FC<TextProps> = ({ ...rest }) => {
  return <Text {...rest} size={FONT_SIZES.font16} />;
};

export const Text14: React.FC<TextProps> = ({ ...rest }) => {
  return <Text {...rest} size={FONT_SIZES.font14} />;
};

export const Text12: React.FC<TextProps> = ({ ...rest }) => {
  return <Text {...rest} size={FONT_SIZES.font12} />;
};
