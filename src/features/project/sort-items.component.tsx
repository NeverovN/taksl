import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Pressable } from 'src/common/components/button.component';
import { Icon } from 'src/common/components/icon.component';
import { Text14 } from 'src/common/components/text.component';
import { COLORS } from 'src/common/constants/colors.consts';
import { ICON_NAMES } from 'src/common/constants/icon-names.consts';
import { STRINGS } from 'src/common/constants/strings.consts';

export interface SortItemsProps {
  style?: StyleProp<ViewStyle>;
  weightSelected: 0 | 1 | 2;
  onWeightPress: () => void;
  deadlineSelected: 0 | 1 | 2;
  onDeadlinePress: () => void;
}

export const SortItems: React.FC<SortItemsProps> = ({
  style,
  weightSelected,
  onWeightPress: setWeightSelected,
  deadlineSelected,
  onDeadlinePress: setDeadlineSelected,
}) => {
  return (
    <View style={[styles.wrapper, style]}>
      <Pressable
        onPress={setWeightSelected}
        style={[styles.item, ...(weightSelected ? [styles.selected] : [])]}>
        <Text14 style={styles.spacer}>{STRINGS.weight}</Text14>
        <Icon
          name={weightSelected === 2 ? ICON_NAMES.down : ICON_NAMES.up}
          size={18}
          color="title"
        />
      </Pressable>
      <Pressable
        onPress={setDeadlineSelected}
        style={[styles.item, ...(deadlineSelected ? [styles.selected] : [])]}>
        <Text14 style={styles.spacer}>{STRINGS.deadline}</Text14>
        <Icon
          name={deadlineSelected === 2 ? ICON_NAMES.down : ICON_NAMES.up}
          size={18}
          color="title"
        />
      </Pressable>
    </View>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  item: {
    backgroundColor: COLORS.backgroundSecondary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Number.MAX_SAFE_INTEGER,
    borderWidth: 1.6,
    borderColor: COLORS.invisible,
    flexDirection: 'row',
    marginRight: 8,
  },
  selected: {
    borderColor: COLORS.border,
  },
  spacer: {
    marginRight: 4,
  },
});
