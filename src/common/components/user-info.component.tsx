import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { FONT_SIZES, FONT_WEIGHTS } from '../types/text.types';
import { Color } from '../types/color.types';
import { TextInput } from './text-input.component';

export interface UserInfoProps {
  name: string;
  role: string;
  setName: (newName: string) => void;
  setRole: (newRole: string) => void;
  textColor?: Color;
  style?: StyleProp<ViewStyle>;
  editable?: boolean;
}

export const UserInfo: React.FC<UserInfoProps> = ({
  name,
  role,
  setName,
  setRole,
  textColor,
  style,
  editable = true,
}) => {
  return (
    <View style={[styles.wrapper, style]}>
      <TextInput
        color={textColor || 'title'}
        fontWeight={FONT_WEIGHTS.bold}
        style={styles.name}
        numberOfLines={1}
        value={name}
        onChangeText={setName}
        size={FONT_SIZES.font24}
        editable={editable}
      />
      <TextInput
        color={textColor || 'title'}
        fontWeight={FONT_WEIGHTS.bold}
        style={styles.name}
        numberOfLines={1}
        value={role}
        onChangeText={setRole}
        size={FONT_SIZES.font16}
        editable={editable}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  wrapper: {},
  name: {
    marginBottom: 8,
  },
});
