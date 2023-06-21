import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { PressableOpacity } from 'src/common/components/button.component';
import { CircledLayout } from 'src/common/components/circled-layout.component';
import { Text12, Text16, Text18 } from 'src/common/components/text.component';
import { COLORS, STRINGS } from 'src/common/constants/consts';

export interface ProjectProps {
  id: string;
  name: string;
  description: string;
  numberOfTasks: number;
  progress: number;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Project: React.FC<ProjectProps> = ({
  name,
  description,
  numberOfTasks,
  progress,
  onPress,
  style,
}) => {
  return (
    <PressableOpacity onPress={onPress} style={[styles.wrapper, style]}>
      <CircledLayout style={styles.assigneeWrapper}>
        <View style={styles.assigneeTextPart}>
          <View>
            <Text18 style={styles.nameSpace} color="title">
              {name}
            </Text18>
            <Text12 color="title">{description}</Text12>
          </View>
        </View>
        <View style={styles.infoBlock}>
          <View style={styles.infoItem}>
            <Text12 color="subtext">
              {STRINGS.tasks}/{STRINGS.h}
            </Text12>
            <Text16 color="text">{numberOfTasks}</Text16>
          </View>
          <View style={styles.infoItem}>
            <Text12 color="subtext">{STRINGS.tasks}</Text12>
            <Text16 color="text">{progress}%</Text16>
          </View>
        </View>
      </CircledLayout>
      <View style={styles.membersBalancer} />
    </PressableOpacity>
  );
};
export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'row',
  },
  circle: {
    height: 44,
    width: 44,
    marginRight: 8,
    borderRadius: Number.MAX_SAFE_INTEGER,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.main,
  },
  nameSpace: {
    marginBottom: 4,
  },
  assigneeTextPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 17,
  },
  infoBlock: {
    flexDirection: 'row',
  },
  assigneeWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 4,
    borderTopRightRadius: Number.MAX_SAFE_INTEGER,
    borderBottomRightRadius: Number.MAX_SAFE_INTEGER,
    borderColor: COLORS.background,
  },
  membersBalancer: {
    width: 32,
  },
});
