import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from 'src/common/constants/colors.consts';
import { Image } from 'src/common/components/image.component';
import { Text14 } from 'src/common/components/text.component';
import { Source } from 'react-native-fast-image';
import { PressableOpacity } from 'src/common/components/button.component';

export interface FilterProps {
  title: string;
  count: number;
  selected: boolean;
  source: Source;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Filter: React.FC<FilterProps> = ({
  title,
  count,
  selected,
  source,
  onPress,
  style,
}) => {
  return (
    <PressableOpacity
      onPress={onPress}
      style={[styles.wrapper, ...(selected ? [styles.selected] : []), style]}>
      <Image source={source} style={styles.indicator}>
        <Text14 color={'title'}>{count}</Text14>
      </Image>
      <Text14 numberOfLines={1} ellipsizeMode="tail" color={'title'}>
        {title}
      </Text14>
    </PressableOpacity>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    height: 73,
    width: 73,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.invisible,
    alignItems: 'center',
  },
  indicator: {
    height: 44,
    width: 44,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    borderColor: COLORS.main,
  },
});
