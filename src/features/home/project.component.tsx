import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { CircledLayout } from 'src/common/components/circled-layout.component';
import { Text22, Text14 } from 'src/common/components/text.component';
import { COLORS } from 'src/common/constants/colors.consts';

export interface ProjectProps {
  id: string;
  name: string;
  description?: string;
  donePercent?: number;
  style?: StyleProp<ViewStyle>;
}

export const Project: React.FC<ProjectProps> = ({
  name,
  description,
  donePercent,
  style,
}) => {
  return (
    <CircledLayout style={[styles.rowWrapper, style]}>
      <View style={styles.textWrapper}>
        <Text22 style={styles.title} numberOfLines={1}>
          {name}
        </Text22>
        {description && <Text14 numberOfLines={1}>{description}</Text14>}
      </View>
      {!!donePercent && (
        <View style={styles.progress}>
          <Text14>{donePercent}%</Text14>
        </View>
      )}
    </CircledLayout>
  );
};

export const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 24,
    paddingVertical: 12,
    width: '100%',
    backgroundColor: COLORS.background,
    minHeight: 68,
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
  },
  progress: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: Number.MAX_SAFE_INTEGER,
  },
});
