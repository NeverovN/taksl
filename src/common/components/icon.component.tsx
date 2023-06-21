import React from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';

import config from 'assets/icons/selection.json';
import { IconName } from '../types/icon-name.types';
import { Color } from '../types/color.types';
import { COLORS } from '../constants/colors.consts';
import { StyleProp, ViewStyle } from 'react-native';

const IconCreator = createIconSetFromIcoMoon(config);

export interface IconProps {
  name: IconName;
  size?: number;
  color?: Color;
  style?: StyleProp<ViewStyle>;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = 'main',
  style,
}) => {
  const iconColor = COLORS[color];

  return (
    <IconCreator name={name} size={size} color={iconColor} style={style} />
  );
};
