import React, { useRef } from 'react';
import {
  Pressable as RNPressable,
  PressableProps as RNPressableProps,
  Animated,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { CustomTextProps, Text } from './text.component';
import { Icon, IconProps } from './icon.component';

export interface PressableProps extends RNPressableProps {}

export const Pressable: React.FC<PressableProps> = ({ ...rest }) => {
  return <RNPressable {...rest} />;
};

export interface PressableOpacityProps extends PressableProps {
  reduceTime?: number;
  restoreTime?: number;
  initialOpacity?: number;
  reducedOpacity?: number;
}

export const PressableOpacity: React.FC<PressableOpacityProps> = ({
  reduceTime = 100,
  restoreTime = 100,
  initialOpacity = 1,
  reducedOpacity = 0.5,
  ...rest
}) => {
  const opacity = useRef(new Animated.Value(initialOpacity)).current;

  const reduceOpacity = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(opacity, {
      toValue: reducedOpacity,
      duration: reduceTime,
      useNativeDriver: true,
    }).start();
  };

  const restoreOpacity = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(opacity, {
      toValue: initialOpacity,
      duration: restoreTime,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ opacity }}>
      <Pressable
        onPressIn={reduceOpacity}
        onPressOut={restoreOpacity}
        {...rest}
      />
    </Animated.View>
  );
};

export interface ButtonProps extends PressableOpacityProps {}

export interface TextButtonProps extends ButtonProps, CustomTextProps {
  title: string;
}

export const TextButton: React.FC<TextButtonProps> = ({
  title,
  fontWeight,
  size,
  color,
  ...rest
}) => {
  return (
    <PressableOpacity {...rest}>
      <Text fontWeight={fontWeight} size={size} color={color}>
        {title}
      </Text>
    </PressableOpacity>
  );
};

export interface IconButtonProps extends Omit<ButtonProps, 'style'>, IconProps {
  containerStyle?: StyleProp<ViewStyle>;
}

export const IconButton: React.FC<IconButtonProps> = ({
  name,
  size,
  color,
  style,
  containerStyle,
  ...rest
}) => {
  return (
    <PressableOpacity {...rest} style={containerStyle}>
      <Icon name={name} size={size} color={color} style={style} />
    </PressableOpacity>
  );
};
