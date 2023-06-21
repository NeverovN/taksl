import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { PressableOpacity } from 'src/common/components/button.component';
import { CircledLayout } from 'src/common/components/circled-layout.component';
import { Text14 } from 'src/common/components/text.component';
import { COLORS } from 'src/common/constants/colors.consts';
import { TaskType } from 'src/common/types/task.types';
import { getStyleByTaskType } from 'src/common/utils/get-style-by-task-type.utils';

export interface IndicatorProps {
  type: TaskType;
  text: string;
  position?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const Indicator: React.FC<IndicatorProps> = ({
  type,
  text,
  position = 'left',
  onPress,
  style,
}) => {
  const { primary } = getStyleByTaskType(type);
  return (
    <PressableOpacity onPress={onPress}>
      <CircledLayout position={position} style={[styles.wrapper, style]}>
        <View style={[styles.indicator, primary]}>
          <Text14 color={'white'}>{text}</Text14>
        </View>
      </CircledLayout>
    </PressableOpacity>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.backgroundSecondary,
  },
  indicator: {
    borderRadius: Number.MAX_SAFE_INTEGER,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
