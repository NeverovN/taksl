import React, { useMemo } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

export interface CircledLayoutProps extends ViewProps {
  position?: 'left' | 'right';
  maxRadius?: number;
}

export const CircledLayout: React.FC<CircledLayoutProps> = ({
  position = 'left',
  style,
  maxRadius,
  ...rest
}) => {
  const { left, right } = useMemo(
    () =>
      StyleSheet.create({
        left: {
          borderTopRightRadius: maxRadius || Number.MAX_SAFE_INTEGER,
          borderBottomRightRadius: maxRadius || Number.MAX_SAFE_INTEGER,
        },
        right: {
          borderTopLeftRadius: maxRadius || Number.MAX_SAFE_INTEGER,
          borderBottomLeftRadius: maxRadius || Number.MAX_SAFE_INTEGER,
        },
      }),
    [maxRadius],
  );

  const layout = useMemo(() => {
    return position === 'left' ? left : right;
  }, [left, position, right]);

  return <View style={[layout, style]} {...rest} />;
};
