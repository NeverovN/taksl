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
  performanceSelected: 0 | 1 | 2;
  onPerformancePress: () => void;
}

export const SortItems: React.FC<SortItemsProps> = ({
  style,
  performanceSelected,
  onPerformancePress,
}) => {
  return (
    <View style={[styles.wrapper, style]}>
      <Pressable
        onPress={onPerformancePress}
        style={[
          styles.item,
          ...(performanceSelected ? [styles.selected] : []),
        ]}>
        <Text14 style={styles.spacer}>{STRINGS.performance}</Text14>
        <Icon
          name={performanceSelected === 2 ? ICON_NAMES.down : ICON_NAMES.up}
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
