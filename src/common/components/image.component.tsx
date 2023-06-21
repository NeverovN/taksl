import React from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';

export interface ImageProps extends FastImageProps {}

export const Image: React.FC<ImageProps> = ({ ...rest }) => {
  return <FastImage {...rest} />;
};
