import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { COLORS } from '../constants/colors.consts';
import { ImageProps } from './image.component';

export interface AvatarProps extends ImageProps {}

export const Avatar: React.FC<AvatarProps> = ({ style, ...rest }) => {
  return <FastImage style={[styles.imageStyle, style]} {...rest} />;
};

export const styles = StyleSheet.create({
  imageStyle: {
    height: 68,
    width: 68,
    borderRadius: 34,
    backgroundColor: COLORS.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
