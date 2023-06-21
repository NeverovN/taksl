import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Icon } from 'src/common/components/icon.component';
import { TextInput } from 'src/common/components/text-input.component';
import { IconName } from 'src/common/types/icon-name.types';

export interface ContactItemProps {
  iconName: IconName;
  value: string;
  onChangeText: (newValue: string) => void;
  placeholder: string;
  style?: StyleProp<ViewStyle>;
  editable?: boolean;
}

export const ContactItem: React.FC<ContactItemProps> = ({
  iconName,
  value,
  onChangeText,
  placeholder,
  style,
  editable = true,
}) => {
  return (
    <View style={[styles.wrapper, style]}>
      <Icon name={iconName} size={24} color={'title'} style={styles.icon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        color={'black'}
        style={styles.input}
        editable={editable}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    height: 36,
    alignItems: 'center',
  },
  icon: {
    marginRight: 22,
  },
  input: {
    flex: 1,
  },
});
