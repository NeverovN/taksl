import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PressableOpacity } from 'src/common/components/button.component';
import { Icon } from 'src/common/components/icon.component';
import { Text14 } from 'src/common/components/text.component';
import { COLORS } from 'src/common/constants/colors.consts';
import { ICON_NAMES } from 'src/common/constants/icon-names.consts';
import { STRINGS } from 'src/common/constants/strings.consts';

export interface AddButtonProps {
  onPress: () => void;
}

export const AddButton: React.FC<AddButtonProps> = ({ onPress }) => {
  return (
    <PressableOpacity onPress={onPress} style={styles.wrapper}>
      <View style={styles.circle}>
        <Icon name={ICON_NAMES.plus} color={'background'} size={24} />
      </View>
      <Text14 color={'black'}>{STRINGS.add}</Text14>
    </PressableOpacity>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    width: 75,
  },
  circle: {
    height: 44,
    width: 44,
    marginBottom: 8,
    borderRadius: Number.MAX_SAFE_INTEGER,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.main,
  },
});
